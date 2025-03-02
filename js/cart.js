document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
        });
        totalContainer.textContent = `Total: $${total.toFixed(2)}`;
        checkoutButton.style.display = cart.length > 0 ? "block" : "none";
    }

    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        }
    });

    checkoutButton.style.display = cart.length > 0 ? "block" : "none";

    checkoutButton.addEventListener("click", function () {
        window.location.href = "checkout/index.html";
    });

    loadCart();
});
