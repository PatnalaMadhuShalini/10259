@echo off
echo ========================================
echo   REBUILDING with Fixed WebConfig
echo ========================================
echo.

cd /d "%~dp0"

echo [Step 1] Stopping Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul
echo.

echo [Step 2] Cleaning project...
call mvnw.cmd clean
echo.

echo [Step 3] Compiling...
call mvnw.cmd compile
if errorlevel 1 (
    echo ERROR: Compilation failed!
    pause
    exit /b 1
)
echo.

echo [Step 4] Starting application...
echo ========================================
echo Wait for: "Started TmfMovieTicketApplication"
echo Then try: http://localhost:8081/movies
echo ========================================
echo.

call mvnw.cmd spring-boot:run

pause
