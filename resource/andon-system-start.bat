@echo off
cd /d C:\App\andon

start cmd /k "npm run server"

timeout /t 2 >nul

start chrome --kiosk http://localhost:80