import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Card, Table } from "@themesberg/react-bootstrap";
import Notification from "../../components/Notification";
import { getJsonDataXuatNhapTon } from "../../data/request";
import { Redirect, Routes } from "react-router-dom";

import DateTimePicker from "react-datetime-picker";
import Datetime from "react-datetime";
import { DatePicker, Space, Button, Dropdown, Menu, Radio, Select } from "antd";
import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";

import moment from "moment";
import Item from "antd/lib/list/Item";

export const TableImport = () => {
  const cookies = new Cookies();
  const [value, onChange] = useState(new Date());
  const [importProduct, setImportProduct] = useState([]);
  const [valueDV, setValueDV] = useState(1);
  const dateFormat = "DD/MM/YYYY";
  const { Option } = Select;

  const handleChangeValue = (value) => {
    setValueDV(value);
  };
  const menu = (
    <Menu
      //   onClick={handleMenuClick}
      items={[
        {
          label: "1st menu item",
          key: "1",
        },
        {
          label: "2nd menu item",
          key: "2",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );
  const dataDVXem = (
    <Menu
      //   onClick={handleMenuClick}
      items={[
        {
          label: "Ctn",
          key: "1",
        },
        {
          label: "Qty",
          key: "2",
        },
        {
          label: "GW",
          key: "3",
        },
        {
          label: "CBM",
          key: "3",
        },
      ]}
    />
  );
  const dataMauIn = (
    <Menu
      //   onClick={handleMenuClick}
      items={[
        {
          label: "Theo SKU",
          key: "1",
        },
        {
          label: "Theo ngày",
          key: "2",
        },
        {
          label: "Theo lô",
          key: "3",
        },
      ]}
    />
  );
  useEffect(() => {
    fetch("https://wms.laziki.com/API_Data_V7.ashx", {
      method: "POST",
      body: JSON.stringify(
        getJsonDataXuatNhapTon(
          cookies.get("token"),
          902,
          1,
          "bfoxint",
          "13/10/2022",
          "14/10/2022",
          1,
          100,
          valueDV
        )
      ),
    })
      .then((res) => res.json())
      .then((data) => setImportProduct(data.Data))
      .catch((err) => cookies.remove("token"));
  }, [valueDV]);

  const MapImportProduct = importProduct.map((item, index) => {
    return {
      item_code: item.Item_Code,
      item_name: item.Item_Name,
      begin_stock: item.Begin_Stock,
      ins: item.In,
      out: item.Out,
      adjust: item.Adjust,
      end_stock: item.End_Stock,
      last_updated: item.Last_Updated,
      index,
    };
  });
  console.log(importProduct);
  const TableRow = (props) => {
    const {
      index,
      item_code,
      item_name,
      begin_stock,
      ins,
      out,
      adjust,
      end_stock,
      last_updated,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {index}
          </Card.Link>
        </td>
        <td>{item_code}</td>
        <td>{item_name}</td>
        <td>{begin_stock}</td>
        <td>{ins}</td>
        <td>{out}</td>
        <td>{adjust}</td>
        <td>{end_stock}</td>
        <td>{last_updated}</td>
      </tr>
    );
  };

  return (
    <>
      <Space direction="horizontal">
        <Space direction="vertical">
          <p>Ngày</p>
          <Space direction="horizontal">
            <DatePicker
              defaultValue={moment("13/10/2022", dateFormat)}
              format={dateFormat}
              size="large"
            />
            <DatePicker
              defaultValue={moment("13/10/2022", dateFormat)}
              format={dateFormat}
              size="large"
            />
          </Space>
        </Space>
        <Space direction="vertical">
          <p>Mã Hàng</p>
          <Space direction="horizontal">
            <Select
              defaultValue="000078"
              style={{ width: 120 }}
              size="large"
              // onChange={handleChangeValue}
              // onChange={handleChange}
            >
              <Option value="000078">000078</Option>
              <Option value="000185">000185</Option>
              <Option value="000633">000633</Option>
              <Option value="000525">000525</Option>
            </Select>
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>Ngày xuất</Radio>
              <Radio value={2}>Ngày ra kho</Radio>
            </Radio.Group>
          </Space>
        </Space>
        <Space direction="vertical">
          <p style={{ color: "white" }}>Tìm Kiếm</p>
          <Button type="primary" icon={<SearchOutlined />} size="large" danger>
            Tìm Kiếm
          </Button>
        </Space>
      </Space>
      <Space direction="horizontal">
        <Space direction="horizontal">
          <p>ĐV Xem</p>
          <Space direction="horizontal">
            <Select
              defaultValue="1"
              style={{ width: 120 }}
              size="large"
              onChange={handleChangeValue}
              // onChange={handleChange}
            >
              <Option value="1">Ctn</Option>
              <Option value="2">Qty</Option>
              <Option value="3">GW</Option>
              <Option value="4">CBM</Option>
            </Select>
          </Space>
        </Space>
        <Space direction="horizontal">
          <Space direction="horizontal" width="20">
            <p>Mẫu in</p>
          </Space>

          <Space direction="horizontal">
            <Select
              defaultValue="sku"
              style={{ width: 120 }}
              size="large"
              // onChange={handleChange}
            >
              <Option value="sku">Theo SKU</Option>
              <Option value="ngay">Theo ngày</Option>
              <Option value="lo">Theo lô</Option>
            </Select>
            {/* <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>Ngày xuất</Radio>
              <Radio value={2}>Ngày ra kho</Radio>
            </Radio.Group> */}
          </Space>
        </Space>
        {/* <Space direction="vertical">
          <p style={{ color: "white" }}>Tìm Kiếm</p>
          <Button type="primary" icon={<SearchOutlined />} size="large" danger>
            Tìm Kiếm
          </Button>
        </Space> */}
      </Space>

      <Card border="light" className="shadow-sm mb-4">
        <Card.Body className="pb-0">
          <Table
            responsive
            className="table-centered table-nowrap rounded mb-0"
          >
            <thead className="thead-light">
              <tr>
                <th className="border-0">#</th>
                <th className="border-0">Mã Loại Hàng</th>
                <th className="border-0">Tên Loại Hàng</th>
                <th className="border-0">Số Đầu kỳ</th>
                <th className="border-0">Nhập</th>
                <th className="border-0">Xuất</th>
                <th className="border-0">Điều chỉnh tồn</th>
                <th className="border-0">Số cuối kỳ</th>
                <th className="border-0">Cập nhật lần cuối</th>
              </tr>
            </thead>
            <tbody>
              {MapImportProduct.map((pt, index) => (
                <TableRow key={`page-traffic-${index}`} {...pt} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};
