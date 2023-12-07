export async function uploadEmployee(employeesData) {
  try {
    console.log(employeesData);
    fetch("/api/employee/addE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeesData), // Send the form data to the API
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } catch (error) {
    console.error("Error adding an employee:", error);
  }
}
