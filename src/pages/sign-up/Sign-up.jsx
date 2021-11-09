import React, { useState } from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Typography, Input, Card, Button, Divider } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const CREATE_USER_URL = "http://localhost:3001/api/users/signup";

const SignUp = () => {
  let navigate = useNavigate();
  const [status, setStatus] = useState("");

  const [fullName, setFullName] = useState("");
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const createNewUser = () => {
    axios
      .post(CREATE_USER_URL, {
        fullName: fullName,
        email: email,
        password: password,
      })
      .then((response) => {
        response.status === 201 ? setStatus("ok") : setStatus("bad");
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center  bg-gray-50">
      <div className="flex flex-col w-64 xl:w-80 pt-20 xl:pt-40">
        <Card>
          <Title level={4}>Sign up</Title>
          <Divider className="mt-4" />
          <Title level={5} className="mt-4">
            Full name
          </Title>
          <Input placeholder="Walter White" onChange={handleFullName} />
          <Title level={5} className="mt-4">
            Email
          </Title>
          <Input placeholder="example@hotmail.com" onChange={handleEmail} />
          <Title level={5} className="mt-4">
            Password
          </Title>
          <Input.Password placeholder="password" onChange={handlePassword} />

          {status === "ok" ? (
            <div className="mt-4">
              <Text type="success">Sign up successfully</Text>
            </div>
          ) : null}
          {status === "bad" ? (
            <div className="mt-4">
              <Text type="danger">Error to sign up</Text>
            </div>
          ) : null}

          <Button
            className="mt-8"
            type="primary"
            onClick={() => {
              createNewUser();
              navigate("/log-in");
            }}
            block
          >
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
