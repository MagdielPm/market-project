import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Layout, Menu, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Employees from "../employees/Employees";
import Foods from "../foods/Foods";
import Products from "../products/Products";
import Customers from "../customers/Customers";
// For log out button
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

// To show toast notifications
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  let navigate = useNavigate();

  const [currentToken, setCurrentToken] = useState("");

  useEffect(() => {
    const validateToken = () => {
      const token = Cookies.get("token");
      setCurrentToken(token);
    };
    validateToken();
  }, [currentToken]);

  const [currentSection, setCurrentSection] = useState(1);
  function renderSwitch(section) {
    switch (section) {
      case 1:
        return (
          <div>
            <Employees />
          </div>
        );
      case 2:
        return (
          <div>
            <Customers />
          </div>
        );
      case 3:
        return (
          <div>
            <Foods />
          </div>
        );
      case 4:
        return (
          <div>
            <Products />
          </div>
        );
      default:
        return <div>Customers</div>;
    }
  }

  if (currentToken === undefined && !currentToken) {
    navigate("/app/log-in");
  }

  return (
    <Layout>
      <ReactNotification />
      <Sider
        className="h-screen"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Title level={3} className="p-4">
          <span className="text-white flex flex-row items-end">
            Rest Market
            <div className="ml-3">
              <UserOutlined />
            </div>
          </span>
        </Title>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => {
              setCurrentSection(1);
            }}
          >
            Employees
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => {
              setCurrentSection(2);
            }}
          >
            Customers
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            onClick={() => {
              setCurrentSection(3);
            }}
          >
            Foods
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<UserOutlined />}
            onClick={() => {
              setCurrentSection(4);
            }}
          >
            Products
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="bg-gray-50 p-0">
          <div className="mt-4">
            <Button
              type="primary"
              danger
              style={{ position: "relative", float: "right" }}
              onClick={() => {
                Cookies.remove("token");
                navigate("/app/log-in");
              }}
            >
              Log out
            </Button>
          </div>
        </Header>
        <Content className="mt-6 mr-4 ml-4 mb-6">
          <div className="bg-white p-6 h-full">
            {renderSwitch(currentSection)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
