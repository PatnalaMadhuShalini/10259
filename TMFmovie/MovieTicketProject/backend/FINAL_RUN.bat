@echo off
cls
color 0B
echo ========================================
echo   FINAL RUN - Hibernate Session Fixed!
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Stopping Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 3 /nobreak >nul
echo DONE!

echo.
echo [2/3] FULL REBUILD (This will take 1-2 minutes)...
call mvnw.cmd clean install -DskipTests
if errorlevel 1 (
    echo BUILD FAILED!
    pause
    exit /b 1
)
echo DONE!

echo.
echo [3/3] Starting Application...
echo ========================================
echo   Wait for: "Started TmfMovieTicketApplication"
echo   Then open: http://localhost:8081/
echo ========================================
echo.

call mvnw.cmd spring-boot:run

pause
