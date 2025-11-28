@echo off
echo Building Movie Ticket Booking Submission Project...

REM ================== CREATE MAIN FOLDER ==================
mkdir Movie_Ticket_Booking_Project
cd Movie_Ticket_Booking_Project

REM ================== FRONTEND REACT ==================
echo Creating React Frontend...
mkdir react_frontend
mkdir react_frontend\src
mkdir react_frontend\src\pages

echo { "name":"movie-ticket-react","dependencies":{"react":"^18","axios":"^1","react-router-dom":"^6"} } > react_frontend\package.json
echo // React App Root > react_frontend\src\App.js
echo // React Index > react_frontend\src\index.js

REM Pages
(for %%p in (Home Login Register Movies Seats Payment Profile Admin Dashboard) do (
  echo // Page: %%p > react_frontend\src\pages\%%p.js
))

REM ================== BACKEND REST API ==================
echo Creating Backend REST Controllers...
mkdir backend
mkdir backend\rest
echo // Movie REST Controller > backend\rest\MovieRestController.java
echo // User REST Controller > backend\rest\UserRestController.java
echo // Booking REST Controller > backend\rest\BookingRestController.java

REM ================== DOCUMENTATION ==================
echo Generating Documentation...
mkdir docs

echo # 1. Introduction and Requirements > docs\1_Introduction.md
echo # 2. Use Case Diagram > docs\2_UseCase.md
echo # 3. Sequence Diagrams > docs\3_Sequence.md
echo # 4. Screenshots > docs\4_Screenshots.md
echo # 5. Class Diagram > docs\5_ClassDiagram.md
echo # 6. ER Diagram > docs\6_ERDiagram.md
echo # 7. Git Repo Link File > docs\7_GitLink.md

REM ================== ZIP OUTPUT ==================
echo Creating Final ZIP Package...
powershell -command "Compress-Archive -Path * -DestinationPath Movie_Submission_Final.zip"

echo =====================================================
echo   ZIP Created Successfully: Movie_Submission_Final.zip
echo   SUBMIT THIS FILE NOW ✔
echo =====================================================
pause
