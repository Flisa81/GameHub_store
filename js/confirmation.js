document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.getElementById("home-btn");

    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

    displayOrderSummary();
});

function getOrderDetails() {
    try {
        const storedOrder = JSON.parse(sessionStorage.getItem("order"));

        if (Array.isArray(storedOrder)) {
            return { items: storedOrder };
        }

        return storedOrder || { items: [] };
    } catch (error) {
        console.error("Order data could not be read:", error);
        return { items: [] };
    }
}

function displayOrderSummary() {
    const order = getOrderDetails();
    const items = order.items || [];
    const orderContainer = document.getElementById("order-items");
    const totalPriceContainer = document.getElementById("total-price");
    const customerMessage = document.getElementById("customer-message");

    if (!orderContainer || !totalPriceContainer) return;

    if (items.length === 0) {
        orderContainer.innerHTML = '<li class="empty-message">No order details were found.</li>';
        totalPriceContainer.textContent = "0.00";
        return;
    }

    if (customerMessage && order.customer?.name) {
        customerMessage.textContent = `Thanks, ${order.customer.name}. A confirmation has been prepared for ${order.customer.email}.`;
    }

    let totalPrice = 0;

    orderContainer.innerHTML = items.map((item) => {
        const quantity = item.quantity || 1;
        const itemTotal = Number(item.price) * quantity;
        totalPrice += itemTotal;
        return `<li>${item.title} (x${quantity}) - $${itemTotal.toFixed(2)}</li>`;
    }).join("");

    totalPriceContainer.textContent = totalPrice.toFixed(2);
}
