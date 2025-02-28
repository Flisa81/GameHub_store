document.addEventListener("DOMContentLoaded", () => {
    displayOrderSummary();
    document.getElementById("checkout-form")?.addEventListener("submit", handleCheckout);
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function displayOrderSummary() {
    let cart = getCart();
    const orderContainer = document.getElementById("order-items");
    const totalPriceContainer = document.getElementById("order-total");

    if (!orderContainer || !totalPriceContainer) return;

    if (cart.length === 0) {
        orderContainer.innerHTML = "<p>No items in order.</p>";
        totalPriceContainer.textContent = "0.00";
        return;
    }

    let totalPrice = 0;
    orderContainer.innerHTML = cart.map(item => {
        totalPrice += item.price * (item.quantity || 1);
        return `
        <li class="order-item">
            <img src="${item.imageUrl}" alt="${item.title}" class="order-item-image">
            <div class="order-item-info">
                <p>${item.title} (x${item.quantity || 1}) - $${(item.price * (item.quantity || 1)).toFixed(2)}</p>
            </div>
        </li>`;
    }).join("");

    totalPriceContainer.textContent = totalPrice.toFixed(2);
}

function handleCheckout(event) {
    event.preventDefault();

    // Retrieve cart and form details
    let cart = getCart();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    
    // Validate cart
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before checking out.");
        return;
    }

    // Validate form fields
    if (!name || !email || !address) {
        alert("Please fill in all required fields.");
        return;
    }

    // ✅ Store cart temporarily for the confirmation page
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Clear cart and redirect to confirmation page
    localStorage.removeItem("cart");
    alert("Payment Successful! Thank you for your order.");
    window.location.href = "../confirmation/index.html"; 

}
function addToCart(id, title, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, title, price, imageUrl });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart!`);
    updateCartCount();
}
