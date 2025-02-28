const gameDetailsContainer = document.getElementById("game-details");

// ✅ Fetch product details using URL parameters
async function fetchGameDetails() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");

    if (!gameId) {
        gameDetailsContainer.innerHTML = "<p>⚠️ Game not found.</p>";
        return;
    }

    try {
        const baseAPIUrl = "https://v2.api.noroff.dev/gamehub";
        const response = await fetch(`${baseAPIUrl}/${gameId}`);
        const data = await response.json();

        if (!response.ok) throw new Error("Game not found");

        displayGameDetails(data.data);
    } catch (error) {
        console.error("Error fetching game details:", error);
        gameDetailsContainer.innerHTML = "<p>⚠️ Error loading game details. Please try again later.</p>";
    }
}

// ✅ Display game details dynamically
function displayGameDetails(game) {
    gameDetailsContainer.innerHTML = `
        <div class="game-container">
            <img class="game-image" src="${game.image.url}" alt="${game.image.alt}">
            <div class="game-info">
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <p><strong>Genre:</strong> ${game.genre}</p>
                <p><strong>Age Rating:</strong> ${game.ageRating}</p>
                <p><strong>Release Date:</strong> ${game.released}</p>
                <p><strong>Price:</strong> $${game.discountedPrice} 
                    ${game.onSale ? `<span class="sale-price">$${game.price}</span>` : ""}
                </p>
                <button onclick="addToCart('${game.id}', '${game.title}', ${game.discountedPrice}, '${game.image.url}')">🛒 Add to Cart</button>
            </div>
        </div>
    `;
}

// ✅ Function to add the game to cart
function addToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the game already exists in the cart
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        alert(`${title} is already in your cart.`);
        return;
    }

    cart.push({ id, title, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
    updateCartCount();
}

// ✅ Update the cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cart.length;
    }
}

// ✅ Run on page load
fetchGameDetails();
updateCartCount();
