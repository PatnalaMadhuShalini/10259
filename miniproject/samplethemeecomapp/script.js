// SanchayaX - AI Curated Shopping Galaxy Script

// Loading Screen Management
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page loads
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000); // Reduced from 3000 to 1000 for faster loading

    // Initialize all functionality
    initializeApp();
});

// App Initialization
function initializeApp() {
    setupNavigation();
    setupMoodSelector();
    setupChatbot();
    setupProductFilters();
    setupCart();
    setupVisualSearch();
    setupAnimations();
}

// Navigation System
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Mood Selector
function setupMoodSelector() {
    const moodBtn = document.getElementById('moodSelector');
    const moodModal = new bootstrap.Modal(document.getElementById('moodModal'));
    const moodOptions = document.querySelectorAll('.mood-option');

    moodBtn.addEventListener('click', function() {
        moodModal.show();
    });

    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            updateMood(mood);
            moodModal.hide();
        });
    });
}

function updateMood(mood) {
    const moodBtn = document.getElementById('moodSelector');
    const moodIcons = {
        'chill': 'fas fa-moon',
        'bold': 'fas fa-fire',
        'minimalist': 'fas fa-circle',
        'adventurous': 'fas fa-rocket',
        'romantic': 'fas fa-heart',
        'professional': 'fas fa-briefcase'
    };

    moodBtn.innerHTML = `<i class="${moodIcons[mood] || 'fas fa-brain'}"></i> Mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;

    // Store mood preference
    localStorage.setItem('userMood', mood);

    // Filter products based on mood (placeholder)
    filterProductsByMood(mood);
}

// Chatbot Functionality
function setupChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const quickSuggestions = document.querySelectorAll('.quick-suggest');

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    quickSuggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            chatInput.value = this.getAttribute('data-suggest');
            sendMessage();
        });
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addMessage('bot', response);
            }, 1000);
        }
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateBotResponse(message) {
        const responses = [
            "I'd love to help you find the perfect items! What style are you looking for?",
            "Based on your preferences, I recommend checking out our curated collections.",
            "Great choice! Let me show you some options that match your cosmic vibe.",
            "I can help you discover products tailored to your mood. What are you in the mood for?",
            "Our AI has analyzed thousands of products to find the best matches for you!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Product Filtering
function setupProductFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');

    // Load sample products
    loadSampleProducts();

    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
}

function loadSampleProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const sampleProducts = [
        { id: 1, name: 'Cosmic Hoodie', category: 'fashion', price: 79.99, image: 'https://via.placeholder.com/300x200/4a0e4e/ffffff?text=Cosmic+Hoodie' },
        { id: 2, name: 'Smart Watch Pro', category: 'tech', price: 299.99, image: 'https://via.placeholder.com/300x200/4a0e4e/ffffff?text=Smart+Watch' },
        { id: 3, name: 'Nebula Lamp', category: 'home', price: 149.99, image: 'https://via.placeholder.com/300x200/4a0e4e/ffffff?text=Nebula+Lamp' },
        { id: 4, name: 'Stellar Gift Set', category: 'gifts', price: 49.99, image: 'https://via.placeholder.com/300x200/4a0e4e/ffffff?text=Gift+Set' },
        { id: 5, name: 'Orbit Sneakers', category: 'fashion', price: 129.99, image: 'https://via.placeholder.com/300x200/4a0e4e/ffffff?text=Orbit+Sneakers' },
        { id: 6, name: 'AI Assistant Device', category: 'tech', price: 199.99, image: 'https://via.placeholder.com/300x200/4a0e4e/ffffff?text=AI+Device' }
    ];

    productsGrid.innerHTML = '';
    sampleProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';

    col.innerHTML = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h5>${product.name}</h5>
                <p>AI-curated for your cosmic journey</p>
                <div class="product-price">
                    <span class="sale-price">$${product.price}</span>
                </div>
                <button class="btn btn-neon add-to-cart" data-product-id="${product.id}">Add to Orbit</button>
            </div>
        </div>
    `;

    return col;
}

function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h5').textContent.toLowerCase();
        const productCategory = card.closest('.col-12').getAttribute('data-category') || 'fashion'; // Default for demo
        const productPrice = parseFloat(card.querySelector('.sale-price').textContent.replace('$', ''));

        let show = true;

        if (category && productCategory !== category) show = false;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => parseFloat(p) || Infinity);
            if (productPrice < min || (max && productPrice > max)) show = false;
        }
        if (searchTerm && !productName.includes(searchTerm)) show = false;

        card.closest('.col-12').style.display = show ? 'block' : 'none';
    });
}

function filterProductsByMood(mood) {
    // Placeholder for mood-based filtering
    console.log('Filtering products for mood:', mood);
}

// Cart Functionality
function setupCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-product-id') || e.target.getAttribute('data-product');
            addToCart(productId);
        }
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find product details (simplified for demo)
    const productNames = {
        'smart-watch': 'Cosmic Smart Watch',
        'earbuds': 'Stellar Earbuds'
    };

    const productName = productNames[productId] || `Product ${productId}`;
    const productPrice = 99.99; // Demo price

    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartSummary.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    cartSummary.style.display = 'block';

    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="https://via.placeholder.com/80x80/4a0e4e/ffffff?text=${item.name.replace(' ', '+')}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h5>${item.name}</h5>
                <p>AI-recommended for you</p>
                <span class="cart-item-price">$${item.price}</span>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${(subtotal + 9.99).toFixed(2)}`;
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Visual Search
function setupVisualSearch() {
    const visualSearchBtn = document.getElementById('visualSearch');
    const visualSearchModal = new bootstrap.Modal(document.getElementById('visualSearchModal'));
    const uploadArea = document.getElementById('uploadArea');
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const previewImage = document.getElementById('previewImage');
    const searchSimilarBtn = document.getElementById('searchSimilar');

    visualSearchBtn.addEventListener('click', function() {
        visualSearchModal.show();
    });

    uploadArea.addEventListener('click', function() {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                uploadArea.style.display = 'none';
                uploadedImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    searchSimilarBtn.addEventListener('click', function() {
        // Placeholder for visual search functionality
        alert('Visual search feature coming soon! This would analyze the image and find similar products.');
        visualSearchModal.hide();
    });
}

// Animations and Effects
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Countdown timer for deals
    startCountdown();
}

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    let timeLeft = 2 * 60 * 60 + 15 * 60 + 30; // 2h 15m 30s

    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateCountdown, 1000);
        } else {
            countdownElement.textContent = 'EXPIRED';
        }
    }

    updateCountdown();
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced search
document.getElementById('searchInput').addEventListener('input', debounce(filterProducts, 300));
