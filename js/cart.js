function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPriceContainer = document.getElementById("total-price");

    if (!cartContainer || !totalPriceContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceContainer.textContent = "0.00";
        return;
    }

    let totalPrice = 0;
    cartContainer.innerHTML = cart.map(item => {
        totalPrice += item.price;
        return `
        <li class="cart-item">
            <img src="${item.imageUrl}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-info">
                <p>${item.title} - $${item.price.toFixed(2)}</p>
                <button class="remove-btn" data-id="${item.id}">❌ Remove</button>
            </div>
        </li>`;
    }).join("");

    totalPriceContainer.textContent = totalPrice.toFixed(2);

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            removeFromCart(event.target.dataset.id);
        });
    });
}

// Remove an item from the cart
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Clear the entire cart
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

// Proceed to checkout
function proceedToCheckout() {
    let cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before proceeding.");
        return;
    }
    window.location.href = "checkout/checkout.html";
}

// Update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        let cart = getCart();
        cartCount.textContent = cart.length;
    }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount(); 
    document.getElementById("clear-cart-btn")?.addEventListener("click", clearCart);
    document.getElementById("checkout-btn")?.addEventListener("click", proceedToCheckout);
});
