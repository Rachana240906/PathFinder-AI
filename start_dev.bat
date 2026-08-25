@echo off
echo Starting PathFinder AI Full-Stack Application...
echo.

start "PathFinder AI - FastAPI Backend" cmd /k "cd /d %~dp0backend && python main.py"
start "PathFinder AI - React Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Backend running on http://127.0.0.1:8000
echo Frontend running on http://localhost:5173
echo.
pause
