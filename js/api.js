const baseAPIUrl = "https://v2.api.noroff.dev/gamehub"; 

export async function fetchAllProducts() {
    try {
        const response = await fetch(baseAPIUrl);
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch products");
        return data.data;
    } catch (error) {
        console.error("Error fetching all products:", error);
        return [];
    }
}

export async function fetchProductById(productId) {
    try {
        const response = await fetch(`${baseAPIUrl}/${productId}`);
        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch product");
        return data.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}
