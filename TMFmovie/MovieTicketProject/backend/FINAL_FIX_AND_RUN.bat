@echo off
cls
color 0A
echo ========================================
echo   FINAL FIX - Movie Ticket System
echo   All JSP Issues Fixed!
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Stopping all Java processes...
taskkill /F /IM java.exe 2>nul
timeout /t 3 /nobreak >nul
echo       DONE!
echo.

echo [2/5] Cleaning old build files...
call mvnw.cmd clean
echo       DONE!
echo.

echo [3/5] Downloading dependencies and compiling...
call mvnw.cmd compile
if errorlevel 1 (
    color 0C
    echo.
    echo ERROR: Compilation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)
echo       DONE!
echo.

echo [4/5] Packaging application...
call mvnw.cmd package -DskipTests
if errorlevel 1 (
    color 0C
    echo.
    echo ERROR: Packaging failed!
    pause
    exit /b 1
)
echo       DONE!
echo.

echo [5/5] Starting Spring Boot Application...
echo.
echo ========================================
echo   WAIT FOR THIS MESSAGE:
echo   "Started TmfMovieTicketApplication"
echo ========================================
echo.
echo Then open your browser to:
echo   http://localhost:8081/
echo.
echo Login with:
echo   Username: testuser
echo   Password: Test@123
echo.
echo ========================================
echo.

call mvnw.cmd spring-boot:run

pause
