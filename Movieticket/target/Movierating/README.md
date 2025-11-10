CineFlow – Movie Ticket Booking Website
📌 Overview
CineFlow is a fully responsive, frontend-only movie ticket booking website built using HTML5, CSS3, and Bootstrap 5.3.0. It features a cinema-themed design that allows users to browse movies, select seats, order food, and simulate payments—all without requiring a backend. This project is ideal for showcasing frontend development and UI/UX design skills.

🚀 Project Status
Status: Complete and Operational

Last Updated: October 30, 2025

🧱 Architecture
🛠 Technology Stack
Frontend: HTML5, CSS3, Bootstrap 5.3.0

Icons: Font Awesome 6.5.1

JavaScript: None (Bootstrap JS only for UI components)

Local Server: Python HTTP Server (for development)

📁 Project Structure
Code
/
├── index.html              # Home page with carousel and movie listings
├── movie-details.html      # Movie info and showtime selection
├── seat-selection.html     # Interactive seat grid
├── food-beverages.html     # Food and beverage ordering
├── payment.html            # Payment and checkout
├── confirmation.html       # Booking confirmation
├── auth.html               # Login and registration
├── css/
│   └── style.css           # Custom styling
├── attached_assets/
│   └── stock_images/       # Movie posters
├── .gitignore
└── README.md               # Project documentation
✨ Features
1. Home Page (index.html)
Hero carousel with featured movies

"Now Showing" and "Coming Soon" sections

Responsive navigation and footer

2. Movie Details (movie-details.html)
Movie synopsis and trailer

Tabbed showtime selection (Today, Tomorrow, Weekend)

Direct navigation to seat selection

3. Seat Selection (seat-selection.html)
Visual seat grid with Regular and Premium categories

Real-time price updates

Disabled booked seats

Booking progress indicator

4. Food & Beverages (food-beverages.html)
Menu with images and pricing

Quantity selectors for each item

Dynamic cart summary with ticket + F&B totals

5. Payment (payment.html)
Multiple payment options (Card, UPI, Net Banking)

Order summary and form validation

Terms & Conditions modal

6. Confirmation (confirmation.html)
Booking success message

Ticket details with QR placeholder

Download/Email options

Unique booking ID generation

7. Authentication (auth.html)
Login and registration forms with validation

Password matching and tab switching

Social login UI (non-functional)

⚙️ Interactivity Notes
This project is built with pure HTML and CSS:

No custom JavaScript; Bootstrap JS used only for UI components (carousel, tabs, modals)

All forms and interactions are visual only

No backend, data persistence, or actual processing

Ideal for portfolio and design demonstration

🎨 Design Highlights
🎨 Color Palette
Primary Blue: #007bff

Success Green: #28a745

Warning Yellow: #ffc107

Dark Gray: #343a40

Light Background: #f0f2f5

📱 Responsive Design
Mobile-first layout

Breakpoints for tablets and desktops

Flexible seat grid

Collapsible navigation

Stacked progress indicators on smaller screens

🆕 Recent Updates
Initial release with all 7 pages

Complete CSS styling with cinema theme

Removed custom JavaScript for pure HTML/CSS experience

Configured Python HTTP server for local testing

Added search/filter options (genre, language, location) on home page

Updated currency to Indian Rupees (₹)

Refactored food-beverages page to remove JavaScript

👤 User Preferences
Frontend-only implementation

Bootstrap 5.3.0 for consistency

Cinema-themed UI with blue as the primary color

Clean, modern design with smooth transitions

▶️ Running the Project
Use Python’s built-in HTTP server to run locally:

bash
python3 -m http.server 5000 --bind 0.0.0.0
🛠 Development Notes
Pure HTML/CSS implementation

Bootstrap JS used only for UI components

All forms are static and non-functional

No authentication, payment processing, or database

Perfect for showcasing frontend design and layout skills

🔮 Future Enhancements
Local storage for user preferences

Expanded movie listings with advanced filtering

Theater location selection

Multi-date calendar picker

Print ticket functionality

Email integration (requires backend)

Real payment gateway integration (requires backend)

