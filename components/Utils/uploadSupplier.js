export async function uploadSupplier(suppliersData) {
  try {
    console.log(suppliersData);
    fetch("/api/supplier/addS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suppliersData), // Send the form data to the API
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } catch (error) {
    console.error("Error adding an supplier:", error);
  }
}
