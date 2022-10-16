import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Card, Table } from "@themesberg/react-bootstrap";
import Notification from "../../components/Notification";
import { getJsonDataInventory } from "../../data/request";
import { Redirect, Routes } from "react-router-dom";
export const TableProduct = () => {
  const cookies = new Cookies();
  const [categoryProduct, setCategoryProduct] = useState([]);
  useEffect(() => {
    fetch("https://wms.laziki.com/API_Data_V7.ashx", {
      method: "POST",
      body: JSON.stringify(
        getJsonDataInventory(cookies.get("token"), 901, 1, "bfoxint", 1, 1000)
      ),
    })
      .then((res) => res.json())
      .then((data) => setCategoryProduct(data.Data))
      .catch((err) => cookies.remove("token"));
  }, []);

  const MapCategoryProduct = categoryProduct.map((item, index) => {
    return {
      group_code: item.SKU_Group_Code,
      group_name: item.SKU_Group_Name,
      index,
    };
  });

  const key = "group_code";

  const arrayUniqueByKey = [
    ...new Map(MapCategoryProduct.map((item) => [item[key], item])).values(),
  ];

  const filterProductEmpty = arrayUniqueByKey.filter(
    (item) => item.group_code !== ""
  );
  console.log(filterProductEmpty);
  const TableRow = (props) => {
    const { index, group_code, group_name } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index}
          </Card.Link>
        </td>
        <td>{group_code}</td>
        <td>{group_name}</td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Mã Loại Hàng</th>
              <th className="border-0">Tên Loại Hàng</th>
            </tr>
          </thead>
          <tbody>
            {filterProductEmpty.map((pt, index) => (
              <TableRow key={`page-traffic-${index}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
