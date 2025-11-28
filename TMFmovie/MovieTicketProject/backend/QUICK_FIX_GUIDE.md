# Quick Fix Guide - JSP 500 Error

## Problem
Getting "Whitelabel Error Page" with 500 Internal Server Error after login.

## Root Cause
JSP pages are not being rendered properly due to missing/incorrect view resolver configuration.

## Fixes Applied

### 1. Updated WebConfig.java
- Removed `@EnableWebMvc` (conflicts with Spring Boot auto-config)
- Added proper `InternalResourceViewResolver` bean
- Configured resource handlers

### 2. Updated application.properties
- Added debug logging to see what's happening
- Kept JSP prefix/suffix configuration

### 3. All JSP files updated
- Changed from old Java EE JSTL URIs to Jakarta EE 10 URIs
- `http://java.sun.com/jsp/jstl/core` → `jakarta.tags.core`

## How to Restart and Test

### Step 1: Stop Current Application
1. Find the PowerShell window running the app
2. Press `Ctrl + C` to stop it
3. Or run: `taskkill /F /IM java.exe`

### Step 2: Restart with Fixes
**Option A - Use the restart script:**
```
Double-click: RESTART_APP.bat
```

**Option B - Manual commands:**
```powershell
cd C:\Users\Satya\Desktop\intel\10259_tmf-movietktbooking\TMFMovieTicket
./mvnw.cmd clean package -DskipTests
./mvnw.cmd spring-boot:run
```

### Step 3: Test the Application
1. Wait for: `Started TmfMovieTicketApplication in X.XXX seconds`
2. Open browser: `http://localhost:8081/`
3. Login with:
   - Username: `testuser`
   - Password: `Test@123`
4. After login, you should see the home page (not error page)

## What to Check in Logs

Look for these in the console:

✅ **Good signs:**
```
Mapped "{[/]}" onto public java.lang.String ...
Mapped "{[/user/login]}" onto ...
Mapped "{[/movies]}" onto ...
InternalResourceViewResolver configured
```

❌ **Bad signs:**
```
No mapping for GET /
Failed to load resource
JSP processing error
```

## If Still Getting 500 Error

### Check 1: Verify JSP Files Exist
```
TMFMovieTicket/src/main/webapp/WEB-INF/views/pages/home.jsp
TMFMovieTicket/src/main/webapp/WEB-INF/views/pages/login.jsp
TMFMovieTicket/src/main/webapp/WEB-INF/views/pages/movies.jsp
```

### Check 2: Look at the Full Error in Console
The PowerShell window will show the actual error. Look for:
- `Caused by:` lines
- `Exception:` messages
- Stack traces

### Check 3: Verify Controller Mappings
Controllers should return view names like:
```java
return "pages/home";  // Will look for /WEB-INF/views/pages/home.jsp
```

## Common Issues and Solutions

### Issue: "No mapping found for HTTP request"
**Solution:** Controller is not mapped correctly
- Check `@RequestMapping` annotations
- Verify controller is in `com.sat.tmf.movietkt` package

### Issue: "Could not resolve view with name 'pages/home'"
**Solution:** View resolver not working
- Verify WebConfig.java is in the config package
- Check application.properties has correct prefix/suffix

### Issue: "JSP processing error"
**Solution:** JSTL tags not working
- All JSP files should use `jakarta.tags.core`
- Check pom.xml has JSTL dependencies

## Debug Mode

The application is now running with DEBUG logging enabled.

To see detailed logs, look for:
```
DEBUG o.s.web.servlet.DispatcherServlet : GET "/movies"
DEBUG o.s.web.servlet.view.InternalResourceView : View name 'pages/movies'
```

## Contact Points

If error persists, provide:
1. Full error message from console
2. URL you're trying to access
3. What you see in the browser

## Files Modified
- ✅ WebConfig.java (created/updated)
- ✅ application.properties (added debug logging)
- ✅ All JSP files (JSTL URIs updated)
- ✅ RUN_APP.bat (updated)
- ✅ RESTART_APP.bat (created)
