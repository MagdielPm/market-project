import React, { useState } from "react";
import "antd/dist/antd.css";
import { Typography, Input, Card, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
//import { store } from "react-notifications-component";


const { Title } = Typography;

const LOG_IN_USER_URL = "http://localhost:3000/api/users/login";

const LogIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const logInUser = () => {
    axios
      .post(LOG_IN_USER_URL, { email: email, password: password })
      .then((response) => {
        console.log(response.status);
        if(response.status === 200) {
          const token = response.data.token;
          Cookies.set("token", token);
          navigate("/app/dashboard");
        }
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center  bg-gray-50">
      <div className="flex flex-col w-64 xl:w-80 pt-20 xl:pt-40">
      
        <Card>
          <Title level={4}>Log in</Title>
          <Divider className="mt-4" />
          <Title level={5} className="mt-4">
            Email
          </Title>
          <Input placeholder="example@hotmail.com" onChange={handleEmail} />
          <Title level={5} className="mt-4">
            Password
          </Title>
          <Input.Password placeholder="password" onChange={handlePassword} />
          <Button
            className="mt-8"
            type="primary"
            onClick={() => { logInUser(); }}
            block
          >
            Log in
          </Button>
          <Divider className="mt-4"> or </Divider>
          <Link to="/app/sign-up">
            <Button block>Sign up</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default LogIn;
