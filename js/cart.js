document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartContainer.innerHTML += `
                    <li class="cart-item">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.title}</h3>
                            <p>Price: $${item.price.toFixed(2)}</p>
                            <button class="remove-item" data-index="${index}">Remove</button>
                        </div>
                    </li>
                `;
            });
        }

        totalContainer.textContent = total.toFixed(2);
        checkoutButton.style.display = cart.length > 0 ? "block" : "none";
    }


    cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const index = parseInt(event.target.getAttribute("data-index"));

            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart(); // Reload cart after removing item
        }
    });

    checkoutButton.addEventListener("click", function () {
        window.location.href = "/checkout/checkout.html"; 
    });

    loadCart();
});
