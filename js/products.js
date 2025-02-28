const baseAPIUrl = "https://v2.api.noroff.dev/gamehub/";
const productsContainer = document.getElementById("products-list");

// Fetch all products from the API
async function fetchProducts() {
    try {
        const response = await fetch(`${baseAPIUrl}`);
        const data = await response.json();

        if (!response.ok) throw new Error("Failed to fetch products");

        displayProducts(data.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        productsContainer.innerHTML = "<p>Error loading products. Please try again later.</p>";
    }
}

// Display products dynamically
function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image.url}" alt="${product.image.alt}">
                <h3>${product.title}</h3>
                <p>Genre: ${product.genre}</p>
                <p>Price: $${product.discountedPrice} 
                    ${product.onSale ? `<span class="sale-price">$${product.price}</span>` : ""}
                </p>
                <!-- ✅ View Game button added -->
                <a href="view_game.html?id=${product.id}" class="view-game-btn">🔍 View Game</a>
                <button onclick="addToCart('${product.id}', '${product.title}', ${product.discountedPrice}, '${product.image.url}')">
                    🛒 Add to Cart
                </button>
            </div>
        `;
    });
}


function addToCart(id, title, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, title, price, imageUrl }); 
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
    updateCartCount();
}


// Function to update the cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cart.length; 
    }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateCartCount();
});
