@echo off
echo ========================================
echo   Movie Ticket Booking System
echo   Starting Application...
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Maven wrapper...
if not exist "mvnw.cmd" (
    echo ERROR: Maven wrapper not found!
    pause
    exit /b 1
)

echo.
echo Compiling project...
call mvnw.cmd clean compile
if errorlevel 1 (
    echo.
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot Application...
echo Please wait, this may take a minute...
echo Wait for message: "Started TmfMovieTicketApplication"
echo Then open browser: http://localhost:8081/
echo.

call mvnw.cmd spring-boot:run

pause
