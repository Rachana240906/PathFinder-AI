import sqlite3
import json
import os
import hashlib
import uuid
from typing import Dict, Any, List, Optional

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "pathfinder.db")

def hash_password(password: str, salt: str = "pathfinder_salt_2026") -> str:
    return hashlib.sha256(f"{salt}_{password}".encode('utf-8')).hexdigest()

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Users table for secured authentication
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            target_role TEXT DEFAULT 'ai_ml_engineer',
            skills_json TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS profiles (
            id TEXT PRIMARY KEY,
            name TEXT,
            email TEXT,
            target_role TEXT,
            skills_json TEXT,
            profile_score INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS analysis_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id TEXT,
            role_id TEXT,
            match_score REAL,
            missing_skills_json TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    conn.close()

def create_user(name: str, email: str, password: str, target_role: str = "ai_ml_engineer", skills: Optional[List[str]] = None) -> Dict[str, Any]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    user_id = str(uuid.uuid4())[:8]
    pwd_hash = hash_password(password)
    skills_json = json.dumps(skills or [])
    
    try:
        cursor.execute("""
            INSERT INTO users (id, name, email, password_hash, target_role, skills_json)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (user_id, name.strip(), email.strip().lower(), pwd_hash, target_role, skills_json))
        conn.commit()
        return {
            "id": user_id,
            "name": name.strip(),
            "email": email.strip().lower(),
            "target_role": target_role,
            "skills": skills or []
        }
    except sqlite3.IntegrityError:
        raise ValueError("User with this email already exists.")
    finally:
        conn.close()

def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    pwd_hash = hash_password(password)
    
    cursor.execute("""
        SELECT id, name, email, target_role, skills_json, created_at
        FROM users
        WHERE email = ? AND password_hash = ?
    """, (email.strip().lower(), pwd_hash))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        skills = []
        try:
            skills = json.loads(row[4]) if row[4] else []
        except Exception:
            skills = []
        return {
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "target_role": row[3],
            "skills": skills,
            "created_at": row[5]
        }
    return None

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, name, email, target_role, skills_json, created_at
        FROM users
        WHERE email = ?
    """, (email.strip().lower(),))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        skills = []
        try:
            skills = json.loads(row[4]) if row[4] else []
        except Exception:
            skills = []
        return {
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "target_role": row[3],
            "skills": skills,
            "created_at": row[5]
        }
    return None

def update_user_profile(email: str, target_role: Optional[str] = None, skills: Optional[List[str]] = None) -> bool:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    updates = []
    params = []
    if target_role:
        updates.append("target_role = ?")
        params.append(target_role)
    if skills is not None:
        updates.append("skills_json = ?")
        params.append(json.dumps(skills))
    
    if not updates:
        conn.close()
        return True
        
    params.append(email.strip().lower())
    sql = f"UPDATE users SET {', '.join(updates)} WHERE email = ?"
    cursor.execute(sql, tuple(params))
    conn.commit()
    affected = cursor.rowcount > 0
    conn.close()
    return affected

def save_profile(profile_id: str, name: str, email: str, target_role: str, skills: List[str], score: int):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO profiles (id, name, email, target_role, skills_json, profile_score)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (profile_id, name, email, target_role, json.dumps(skills), score))
    conn.commit()
    conn.close()

def get_profile(profile_id: str) -> Optional[Dict[str, Any]]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, target_role, skills_json, profile_score, created_at FROM profiles WHERE id = ?", (profile_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "target_role": row[3],
            "skills": json.loads(row[4]),
            "profile_score": row[5],
            "created_at": row[6]
        }
    return None

init_db()
