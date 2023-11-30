"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function MyNextJsExcelSheet() {
  const [items, setItems] = useState([]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        console.log(data);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setItems(d);
    });
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
      <br></br>
      <br></br>
      <br></br>

      <p>Display Excel Patterns of Product, Supplier and Employees Here</p>
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
