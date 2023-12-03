"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function MyNextJsExcelSheet() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sampleData, setSampleData] = useState(null);

  const readExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const sheetNames = wb.SheetNames;

      if (
        sheetNames.includes("Products") &&
        sheetNames.includes("Suppliers") &&
        sheetNames.includes("Employees")
      ) {
        const productsWS = wb.Sheets["Products"];
        const suppliersWS = wb.Sheets["Suppliers"];
        const employeesWS = wb.Sheets["Employees"];

        const productsData = XLSX.utils.sheet_to_json(productsWS);
        const suppliersData = XLSX.utils.sheet_to_json(suppliersWS);
        const employeesData = XLSX.utils.sheet_to_json(employeesWS);

        // Check if the necessary columns exist in the sheets
        const productsColumns = [
          "name",
          "description",
          "price",
          "quantity",
          "unitOfMeasure",
          "category",
          "brand",
          "sku",
        ];
        const suppliersColumns = [
          "name",
          "contactPerson",
          "email",
          "phone",
          "address",
        ];
        const employeesColumns = [
          "name",
          "email",
          "phone",
          "address",
          "position",
          "hireDate",
          "salary",
          "workingHours",
          "status",
        ];

        const containsRequiredColumns = (columns, sheetData) =>
          columns.every((col) => Object.keys(sheetData[0]).includes(col));

        if (
          containsRequiredColumns(productsColumns, productsData) &&
          containsRequiredColumns(suppliersColumns, suppliersData) &&
          containsRequiredColumns(employeesColumns, employeesData)
        ) {
          setProducts(productsData);
          setSuppliers(suppliersData);
          setEmployees(employeesData);

          // Create a sample file
          const sampleWB = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(
            sampleWB,
            XLSX.utils.json_to_sheet([{ name: "Sample Data" }])
          );
          const sampleFile = XLSX.write(sampleWB, {
            bookType: "xlsx",
            type: "buffer",
          });
          setSampleData(sampleFile);
        } else {
          // If columns are missing, handle accordingly
          console.error("Columns are missing in one or more sheets.");
        }
      } else {
        // If any sheet is missing, handle accordingly
        console.error("One or more sheets are missing.");
      }
    };
    fileReader.onerror = (error) => {
      console.error(error);
    };
  };

  // Function to handle downloading the sample file
  const downloadSampleFile = () => {
    if (sampleData) {
      const blob = new Blob([sampleData], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SampleFile.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <br />
      <br />
      <br />

      <button onClick={downloadSampleFile}>Download Sample File</button>

      {/* Display Excel Patterns of Product, Supplier, and Employees Here */}
      <div>
        <h2>Products</h2>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </div>
      <div>
        <h2>Suppliers</h2>
        <pre>{JSON.stringify(suppliers, null, 2)}</pre>
      </div>
      <div>
        <h2>Employees</h2>
        <pre>{JSON.stringify(employees, null, 2)}</pre>
      </div>
    </div>
  );
}

// import * as XLSX from "xlsx";
// //f = file
// var name = f.name;
// const reader = new FileReader();
// reader.onload = (evt) => {
//   // evt = on_file_select event
//   /* Parse data */
//   const bstr = evt.target.result;
//   const wb = XLSX.read(bstr, { type: "binary" });
//   /* Get first worksheet */
//   const wsname = wb.SheetNames[0];
//   const ws = wb.Sheets[wsname];
//   /* Convert array of arrays */
//   const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
//   /* Update state */
//   console.log("Data>>>" + data);
// };
// reader.readAsBinaryString(f);
