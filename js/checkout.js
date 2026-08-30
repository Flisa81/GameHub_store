document.addEventListener("DOMContentLoaded", () => {
    const orderSummaryContainer = document.getElementById("order-items");
    const totalContainer = document.getElementById("order-total");
    const checkoutForm = document.getElementById("checkout-form");
    const placeOrderButton = document.getElementById("place-order-button");

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
            console.error("Cart data could not be read:", error);
            return [];
        }
    }

    function getImagePath(item) {
        const image = item.image || item.imageUrl || "";

        if (image.startsWith("http") || image.startsWith("../")) {
            return image;
        }

        if (image.startsWith("./")) {
            return `.${image}`;
        }

        return `../${image}`;
    }

    function loadOrderSummary() {
        const cart = getCart();
        orderSummaryContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = '<li class="empty-message">No items in your order yet.</li>';
            totalContainer.textContent = "0.00";
            if (placeOrderButton) placeOrderButton.disabled = true;
            return;
        }

        cart.forEach((item) => {
            const quantity = item.quantity || 1;
            const itemTotal = Number(item.price) * quantity;
            total += itemTotal;

            orderSummaryContainer.innerHTML += `
                <li class="order-item">
                    <img src="${getImagePath(item)}" alt="${item.title}" class="order-item-image">
                    <div>
                        <h3>${item.title}</h3>
                        <p>Quantity: ${quantity}</p>
                        <p>Price: $${itemTotal.toFixed(2)}</p>
                    </div>
                </li>
            `;
        });

        totalContainer.textContent = total.toFixed(2);
        if (placeOrderButton) placeOrderButton.disabled = false;
    }

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const cart = getCart();

            if (cart.length === 0) {
                alert("Your cart is empty. Please add items before checking out.");
                return;
            }

            if (!checkoutForm.checkValidity()) {
                checkoutForm.reportValidity();
                return;
            }

            const order = {
                items: cart,
                customer: {
                    name: document.getElementById("name").value.trim(),
                    email: document.getElementById("email").value.trim(),
                    address: document.getElementById("address").value.trim()
                },
                createdAt: new Date().toISOString()
            };

            sessionStorage.setItem("order", JSON.stringify(order));
            localStorage.removeItem("cart");
            window.location.href = "../confirmation/index.html";
        });
    }

    loadOrderSummary();
});
