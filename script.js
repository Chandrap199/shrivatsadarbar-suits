// Sample Luxury Product Catalog (Updated for ShriVatsaDarbar)
const products = [
    {
        id: 1,
        name: "Royal Crimson Banarasi Katan Silk Saree",
        price: 18500,
        image: "images/banners/hero-01.webp"
    },
    {
        id: 2,
        name: "Ivory Georgette Embroidered Anarkali Suit",
        price: 14200,
        image: "images/banners/hero-02.webp"
    },
    {
        id: 3,
        name: "Emerald Green Organza Tissue Saree",
        price: 12800,
        image: "images/banners/hero-03.webp"
    },
    {
        id: 4,
        name: "Pastel Mint Hand-Worked Palazzo Suit",
        price: 16000,
        image: "images/banners/hero-04.webp"
    }
];

let cart = [];

// Initialize storefront display
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("product-grid");
    if (grid) {
        grid.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'">
                </div>
                <div class="product-info">
                    <h4>${p.name}</h4>
                    <div class="price">₹${p.price.toLocaleString('en-IN')}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${p.id})">Add to Inquiry Cart</button>
                </div>
            </div>
        `).join('');
    }
});

function toggleCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("overlay");
    if (drawer) drawer.classList.toggle("open");
    if (overlay) overlay.classList.toggle("active");
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    toggleCart();
}

function updateCartUI() {
    const countEl = document.getElementById("cart-count");
    const itemsEl = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total-price");
    
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countEl) countEl.innerText = totalCount;
    
    if (!itemsEl || !totalEl) return;

    if (cart.length === 0) {
        itemsEl.innerHTML = `<p style="text-align:center; color:#888; margin-top:40px;">Your cart is empty.</p>`;
        totalEl.innerText = `₹0`;
        return;
    }
    
    let totalPrice = 0;
    itemsEl.innerHTML = cart.map(item => {
        totalPrice += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" onerror="this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80'">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
                </div>
            </div>
        `;
    }).join('');
    
    totalEl.innerText = `₹${totalPrice.toLocaleString('en-IN')}`;
}

function sendToWhatsApp() {
    if (cart.length === 0) {
        alert("Please add at least one item to inquire.");
        return;
    }
    
    // Configured with your direct business WhatsApp number
    const phoneNumber = "918892439980";
    
    let message = "Hello Shri Vatsa Darbar! I would like to place an inquiry/order for the following items:\n\n";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n   Quantity: ${item.quantity}\n   Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `*Estimated Grand Total: ₹${total.toLocaleString('en-IN')}*\n\n`;
    message += "Please let me know about availability and shipping details.";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
