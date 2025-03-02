document.addEventListener("DOMContentLoaded", function () {
    const orderSummaryContainer = document.getElementById("order-items");
    const totalContainer = document.getElementById("order-total");
    const placeOrderButton = document.getElementById("place-order-button");

    function loadOrderSummary() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        orderSummaryContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = "<p>No items in your order.</p>";
        } else {
            cart.forEach(item => {
                total += item.price;
                orderSummaryContainer.innerHTML += `
                    <li class="order-item">
                        <img src="${item.image}" alt="${item.title}" class="order-item-image">
                        <h3>${item.title}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </li>
                `;
            });
        }

        totalContainer.textContent = total.toFixed(2);
    }

    // ✅ Fix: Clear cart after order is placed
    placeOrderButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        window.location.href = "confirmation.html"; // ✅ Redirect to confirmation page
    });

    loadOrderSummary();
});
