CineFlow – Movie Ticket Booking Website

Overview
CineFlow is a fully responsive, frontend-only movie ticket booking website built using HTML5, CSS3, and Bootstrap 5.3.0. It features a cinema-themed design that allows users to browse movies, select seats, order food, and simulate payments—all without requiring a backend. This project is ideal for showcasing frontend development and UI/UX design skills.




 Architecture
 Technology Stack
Frontend: HTML5, CSS3, Bootstrap 5.3.0
Icons: Font Awesome 6.5.1


 Project Structure
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
├
└── README.md               # Project documentation

 
 Features
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

 Interactivity Notes:
This project is built with pure HTML and CSS:

No custom JavaScript; Bootstrap JS used only for UI components (carousel, tabs, modals)

All forms and interactions are visual only

No backend, data persistence, or actual processing

Ideal for portfolio and design demonstration

 Design Highlights
 Color Palette
Primary Blue: #007bff

Success Green: #28a745

Warning Yellow: #ffc107

Dark Gray: #343a40

Light Background: #f0f2f5

Responsive Design
Mobile-first layout

Breakpoints for tablets and desktops

Flexible seat grid

Collapsible navigation

Stacked progress indicators on smaller screens

Development Notes
Pure HTML/CSS implementation
Bootstrap JS used only for UI components
All forms are static and non-functional
No authentication, payment processing, or database
Perfect for showcasing frontend design and layout skills

Future Enhancements:
Local storage for user preferences

Expanded movie listings with advanced filtering

Theater location selection

Multi-date calendar picker

Print ticket functionality

Email integration (requires backend)

Real payment gateway integration (requires backend)



