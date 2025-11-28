@echo off
cls
echo ========================================
echo   QUICK START - Movie Ticket System
echo ========================================
echo.
echo Stopping old processes...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul

cd /d "%~dp0"

echo.
echo Building and starting application...
echo This will take about 1-2 minutes...
echo.

call mvnw.cmd clean install -DskipTests spring-boot:run

pause
