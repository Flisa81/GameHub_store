document.addEventListener("DOMContentLoaded", () => {
    displayOrderSummary();
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function displayOrderSummary() {
    let cart = getCart();
    const orderContainer = document.getElementById("order-items");
    const totalPriceContainer = document.getElementById("total-price");

    if (!orderContainer || !totalPriceContainer) return;

    if (cart.length === 0) {
        orderContainer.innerHTML = "<p>No items in order.</p>";
        totalPriceContainer.textContent = "0.00";
        return;
    }

    let totalPrice = 0;
    orderContainer.innerHTML = cart.map(item => {
        totalPrice += item.price * (item.quantity || 1);
        return `<li>${item.title} (x${item.quantity || 1}) - $${(item.price * (item.quantity || 1)).toFixed(2)}</li>`;
    }).join("");

    totalPriceContainer.textContent = totalPrice.toFixed(2);

    // ✅ Clear the cart AFTER the order summary is displayed
    setTimeout(() => {
        localStorage.removeItem("cart");
    }, 500); // Small delay to ensure order summary is shown
}

// Handle "Back to Home" button
document.getElementById("home-btn").addEventListener("click", () => {
    window.location.href = "../index.html";
});
