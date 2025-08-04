// Product data
const products = [
    {
        id: 1,
        name: "Banana Bread",
        description: "Moist and delicious banana bread with walnuts",
        price: "Rs. 120",
        image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
        detailsPage: "banana-bread.html"
    },
    {
        id: 2,
        name: "Chocolate Cake",
        description: "Rich chocolate cake with chocolate frosting",
        price: "Rs. 300",
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.9,
        detailsPage: "choco-cake.html"
    },
    {
        id: 3,
        name: "French Croissants",
        description: "Buttery and flaky French croissants",
        price: "Rs. 80 each",
        image: "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.7,
        detailsPage: "croissant.html"
    },
    {
        id: 4,
        name: "Blueberry Muffins",
        description: "Fresh blueberry muffins with streusel topping",
        price: "Rs. 250 each",
        image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        detailsPage: "muffin.html"
    },
    {
        id: 5,
        name: "Blueberry Pie",
        description: "Classic blueberry pie with flaky crust",
        price: "Rs. 300",
        image: "https://images.pexels.com/photos/7525184/pexels-photo-7525184.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.8,
        detailsPage: "blueberry-pie.html"
    }
];

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '⭐';
    }
    
    if (hasHalfStar) {
        starsHTML += '⭐';
    }
    
    return starsHTML;
}

// Load products into grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onclick="viewDetails('${product.detailsPage}')">
                <div class="rating">
                    ${generateStars(product.rating)} ${product.rating}
                </div>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">${product.price}</div>
            <div class="product-buttons">
                <a href="${product.detailsPage}" class="btn btn-primary">
                    View Details →
                </a>
                <button class="btn btn-secondary" onclick="addToCart('${product.name}')">
                    🛒
                </button>
            </div>
        </div>
    `).join('');
}

// View product details
function viewDetails(detailsPage) {
    window.open(detailsPage, '_blank');
}

// Add to cart function
function addToCart(productName) {
    // Simple alert for demo - in real app, this would add to cart
    showNotification(`Added ${productName} to cart!`, 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#d05781' : '#a2678a'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    smoothScroll();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Product detail page functions
function addToCartDetail() {
    const quantity = document.getElementById('qty')?.value || 1;
    const productName = document.querySelector('h2')?.textContent || 'Product';
    showNotification(`Added ${quantity} ${productName}(s) to cart!`, 'success');
}

function orderNow() {
    const quantity = document.getElementById('qty')?.value || 1;
    const productName = document.querySelector('h2')?.textContent || 'Product';
    const priceText = document.querySelector('.price')?.textContent || 'Rs. 0';
    
    // Extract price number from text
    const priceMatch = priceText.match(/Rs\.\s*(\d+)/);
    const price = priceMatch ? parseInt(priceMatch[1]) : 0;
    const total = price * quantity;
    
    showNotification(`Order total: Rs. ${total} for ${quantity} ${productName}(s)`, 'success');
}

// Contact form handling
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            showNotification(`Thank you, ${name}! Your message has been sent. We will get back to you soon at ${email}.`, 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Initialize contact form if on contact page
if (document.getElementById('contactForm')) {
    document.addEventListener('DOMContentLoaded', handleContactForm);
}