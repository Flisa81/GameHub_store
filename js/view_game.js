const gameDetailsContainer = document.getElementById("game-details");

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
}

async function fetchGameDetails() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");

    if (!gameId) {
        gameDetailsContainer.innerHTML = '<p class="error-message">Game not found.</p>';
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
        gameDetailsContainer.innerHTML = '<p class="error-message">Error loading game details. Please try again later.</p>';
    }
}

function displayGameDetails(game) {
    gameDetailsContainer.innerHTML = `
        <div class="game-container">
            <img class="game-image" src="${game.image.url}" alt="${game.image.alt || game.title}">
            <div class="game-info">
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <p><strong>Genre:</strong> ${game.genre}</p>
                <p><strong>Age Rating:</strong> ${game.ageRating}</p>
                <p><strong>Release Date:</strong> ${game.released}</p>
                <p><strong>Price:</strong> $${game.discountedPrice} ${game.onSale ? `<span class="sale-price">$${game.price}</span>` : ""}</p>
                <button type="button" id="add-current-game">🛒 Add to Cart</button>
            </div>
        </div>
    `;

    document.getElementById("add-current-game").addEventListener("click", () => {
        addToCart(game.id, game.title, game.discountedPrice, game.image.url);
    });
}

function addToCart(id, title, price, image) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        showToast(`${title} is already in your cart.`);
        return;
    }

    cart.push({ id, title, price, image, imageUrl: image });
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

fetchGameDetails();
updateCartCount();
