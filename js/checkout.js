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
    placeOrderButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents form from submitting immediately

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty!"); // Prevents empty orders
            return;
        }

        sessionStorage.setItem("order", JSON.stringify(cart));
        localStorage.removeItem("cart"); 

        window.location.href = "confirmation.html"; 
    });

    loadOrderSummary();
});
