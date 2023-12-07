"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function MyNextJsExcelSheet() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [employees, setEmployees] = useState([]);

  const readExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const sheetNames = wb.SheetNames;
      let productsData = [];
      let suppliersData = [];
      let employeesData = [];

      if (sheetNames.includes("Products")) {
        const productsWS = wb.Sheets["Products"];
        productsData = XLSX.utils.sheet_to_json(productsWS);
      }
      if (sheetNames.includes("Suppliers")) {
        const suppliersWS = wb.Sheets["Suppliers"];
        suppliersData = XLSX.utils.sheet_to_json(suppliersWS);
      }
      if (sheetNames.includes("Employees")) {
        const employeesWS = wb.Sheets["Employees"];
        employeesData = XLSX.utils.sheet_to_json(employeesWS);
      }

      const productsColumns = ["name", "description", "price"];
      const suppliersColumns = ["name"];
      const employeesColumns = ["name"];

      const containsRequiredColumns = (columns, sheetData) =>
        columns.every((col) => Object.keys(sheetData[0] || {}).includes(col));

      if (containsRequiredColumns(productsColumns, productsData)) {
        setProducts(productsData);
        if (productsData.length > 0) {
          productsData.forEach(async (product) => {
            try {
              const supplierId = await getSupplierId(product.supplier);
              const updatedProductData = { ...product, supplier: supplierId };
              await uploadProduct(updatedProductData);
              alert("Product data added successfully!");
            } catch (error) {
              alert("Error adding product data:", error);
            }
          });
        } else {
          console.error("Products data is empty.");
        }
      } else {
        console.error("Columns are missing in Products sheet.");
      }

      if (containsRequiredColumns(suppliersColumns, suppliersData)) {
        setSuppliers(suppliersData);
        if (suppliersData.length > 0) {
          suppliersData.forEach(async (supplier) => {
            try {
              await uploadSupplier(supplier);
              alert("Supplier data added successfully!");
            } catch (error) {
              alert("Error adding supplier data:", error);
            }
          });
        } else {
          console.error("Suppliers data is empty.");
        }
      } else {
        console.error("Columns are missing in Suppliers sheet.");
      }

      if (containsRequiredColumns(employeesColumns, employeesData)) {
        setEmployees(employeesData);
        if (employeesData.length > 0) {
          employeesData.forEach(async (employee) => {
            try {
              await uploadEmployee(employee);
              alert("Employee data added successfully!");
            } catch (error) {
              alert("Error adding employee data:", error);
            }
          });
        } else {
          console.error("Employees data is empty.");
        }
      } else {
        console.error("Columns are missing in Employees sheet.");
      }
    };
    fileReader.onerror = (error) => {
      console.error(error);
    };
  };
  async function uploadEmployee(employeesData) {
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
  async function uploadProduct(productsData) {
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
  async function uploadSupplier(suppliersData) {
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
  async function getSupplierId(supplierName) {
    try {
      const response = await fetch(
        `/api/supplier/getId?name=${encodeURIComponent(supplierName)}`
      );
      if (response.ok) {
        const data = await response.json();
        return data._id;
      } else {
        throw new Error("Supplier not found");
      }
    } catch (error) {
      console.error("Error fetching supplier ID:", error);
      throw new Error("Error fetching supplier ID");
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 border rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Sample File Information</h2>
        <p>
          Please download the sample file for reference:{" "}
          <a
            href="/files/InventoryData.xlsx"
            download="InventoryData.xlsx"
            className="text-blue-500"
          >
            InventoryData.xlsx
            <img src="download.svg" alt="download" height={24} width={24} />
          </a>
          It contains three sheets Products, Suppliers and Employees. Each sheet
          contains attributes.
        </p>
        <ul>
          <li>
            Products has name, description and price as compulsory attributes.{" "}
          </li>
          <li>
            While suppliers and employees have name as compulsory attribute.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Upload File</h2>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
          className="border rounded p-2"
        />
      </div>
    </div>
  );
}
