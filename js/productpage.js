const productContainer = document.getElementById("product-details");

async function fetchProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        productContainer.innerHTML = "<p> Product not found.</p>";
        return;
    }

    try {
        const baseAPIUrl = "https://v2.api.noroff.dev/gamehub";
        const response = await fetch(`${baseAPIUrl}/${productId}`); // 
        const data = await response.json();

        if (!response.ok) throw new Error("Product not found");

        displayProduct(data.data);
    } catch (error) {
        console.error("Error fetching product:", error);
        productContainer.innerHTML = "<p> Error loading product. Please try again later.</p>";
    }
}

function displayProduct(product) {
    productContainer.innerHTML = `
        <div class="product-container">
            <img class="product-image" src="${product.image.url}" alt="${product.image.alt}">
            <div class="product-info">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p><strong>Genre:</strong> ${product.genre}</p>
                <p><strong>Age Rating:</strong> ${product.ageRating}</p>
                <p><strong>Release Date:</strong> ${product.released}</p>
                <p><strong>Price:</strong> $${product.discountedPrice} 
                    ${product.onSale ? `<span class="sale-price">$${product.price}</span>` : ""}
                </p>
                <button onclick="addToCart('${product.id}', '${product.title}', ${product.discountedPrice})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Run on page load
fetchProduct();
