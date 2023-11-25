import React, { useState } from "react";
import * as XLSX from "xlsx";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Form, Row } from "react-bootstrap";

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

      <Row>
        <Col lg={12}>
          <h3>The Data of The Uploaded Excel Sheet</h3>
          <Table striped bordered hover variant="warning">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Phone</th>
                <th>UserName</th>
                <th>Email Id</th>
                <th>Password</th>
                <th>Test Date</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {items.map((datas, index) => (
                <tr key={index}>
                  <td>{datas.FirstName}</td>
                  <td>{datas.LastName}</td>
                  <td>{datas.Phone}</td>
                  <td>{datas.UserName}</td>
                  <td>{datas.emailid}</td>
                  <td>{datas.Password}</td>
                  <td>{datas.testdate}</td>
                  <td>{datas.Comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
