const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";
const productsContainer = document.getElementById("products-list");

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}

async function fetchProducts() {
    productsContainer.innerHTML = '<p class="loading-message">Loading games...</p>';

    try {
        const response = await fetch(baseAPIUrl);
        const data = await response.json();

        if (!response.ok) throw new Error("Failed to fetch products");

        displayProducts(data.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        productsContainer.innerHTML = '<p class="error-message">Sorry, the games could not be loaded. Please try again later.</p>';
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        const originalPrice = product.onSale
            ? `<span class="sale-price">$${product.price}</span>`
            : "";

        card.innerHTML = `
            <img loading="lazy" src="${product.image.url}" alt="${product.image.alt || product.title}">
            <h3>${product.title}</h3>
            <p><strong>Genre:</strong> ${product.genre}</p>
            <p><strong>Price:</strong> $${product.discountedPrice} ${originalPrice}</p>
            <a href="view_game.html?id=${product.id}" class="view-game-btn" aria-label="View details for ${product.title}">🔍 View Game</a>
            <button type="button" aria-label="Add ${product.title} to cart">🛒 Add to Cart</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            addToCart(product.id, product.title, product.discountedPrice, product.image.url);
        });

        productsContainer.appendChild(card);
    });
}

function addToCart(id, title, price, imageUrl) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        showToast(`${title} is already in your cart.`);
        return;
    }

    cart.push({ id, title, price, image: imageUrl, imageUrl });
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`${title} added to cart!`);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cart.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateCartCount();
});
