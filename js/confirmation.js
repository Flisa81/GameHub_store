document.addEventListener("DOMContentLoaded", () => {
    displayOrderSummary();

    // ✅ Fix: Ensure "Back to Home" button exists before adding event listener
    const homeButton = document.getElementById("home-btn");
    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "index.html"; // Adjusted path
        });
    }
});

// ✅ Fix: Use sessionStorage to retain order details after checkout
function getOrderDetails() {
    return JSON.parse(sessionStorage.getItem("order")) || [];
}

function displayOrderSummary() {
    let order = getOrderDetails();
    const orderContainer = document.getElementById("order-items");
    const totalPriceContainer = document.getElementById("total-price");

    if (!orderContainer || !totalPriceContainer) {
        console.error("Error: Elements missing in confirmation.html");
        return;
    }

    if (order.length === 0) {
        orderContainer.innerHTML = "<p>No items in order.</p>";
        totalPriceContainer.textContent = "$0.00";
        return;
    }

    let totalPrice = 0;
    orderContainer.innerHTML = order.map(item => {
        totalPrice += item.price * (item.quantity || 1);
        return `<li>${item.title} (x${item.quantity || 1}) - $${(item.price * (item.quantity || 1)).toFixed(2)}</li>`;
    }).join("");

    totalPriceContainer.textContent = `$${totalPrice.toFixed(2)}`;

    // ✅ Clear cart after displaying the order summary
    setTimeout(() => {
        localStorage.removeItem("cart"); // Ensures cart is cleared after display
        sessionStorage.removeItem("order"); // Clears order details
    }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
    const confirmationMessage = document.getElementById("confirmation-message");
    confirmationMessage.textContent = "Thank you for your purchase! Your order has been placed successfully.";
});