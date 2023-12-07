export async function uploadProducts(productsData) {
  try {
    console.log(productsData);
    fetch("/api/product/addP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsData), // Send the form data to the API
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } catch (error) {
    console.error("Error adding a product:", error);
  }
}
