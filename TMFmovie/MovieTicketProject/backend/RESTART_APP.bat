@echo off
echo ========================================
echo   RESTARTING Movie Ticket Booking App
echo   With JSP Fixes Applied
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Stopping any running Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 3 /nobreak >nul
echo Done!
echo.

echo [2/4] Cleaning and rebuilding project...
call mvnw.cmd clean package -DskipTests
if errorlevel 1 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Done!
echo.

echo [3/4] Starting Spring Boot Application...
echo.
echo ========================================
echo IMPORTANT: Watch for these messages:
echo   - "Started TmfMovieTicketApplication"
echo   - Then open: http://localhost:8081/
echo ========================================
echo.

echo [4/4] Running application...
call mvnw.cmd spring-boot:run

pause
