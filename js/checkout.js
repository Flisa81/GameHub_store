document.addEventListener("DOMContentLoaded", function () {
    const orderSummaryContainer = document.getElementById("order-summary");
    const totalContainer = document.getElementById("order-total");
    const placeOrderButton = document.getElementById("place-order-button");

    function loadOrderSummary() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        orderSummaryContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            orderSummaryContainer.innerHTML += `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
            `;
        });
        totalContainer.textContent = `Total: $${total.toFixed(2)}`;
    }

    placeOrderButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        window.location.href = "confirmation/index.html";
    });

    loadOrderSummary();
});
