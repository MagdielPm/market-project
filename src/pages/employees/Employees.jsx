import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Typography, Modal, Input } from "antd";
import axios from "axios";

import EmployeeItem from "./components/EmployeeItem";
import Cookies from "js-cookie";

const { Title } = Typography;

const EMPLOYEES_URL = "http://localhost:3000/api/employees";

const Customers = () => {
  const [employeesList, setEmployeeList] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeeList = await axios.get(EMPLOYEES_URL, {
        headers: {
          user_token: token,
        },
      });
      const employees = employeeList.data.data;
      setEmployeeList(employees);
    };
    fetchEmployees();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fullName, setFullName] = useState("");
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const [numberPhone, setNumberPhone] = useState("");
  const handleNumberPhone = (event) => {
    setNumberPhone(event.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const [job, setJob] = useState("");
  const handleJob = (event) => {
    setJob(event.target.value);
  };

  const [state, setState] = useState("");
  const handleState = (event) => {
    setState(event.target.value);
  };

  const [city, setCity] = useState("");
  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleNewEmployee = () => {
    axios
      .post(
        EMPLOYEES_URL,
        {
          fullName: fullName,
          numberPhone: numberPhone,
          email: email,
          job: job,
          state: state,
          city: city,
        },
        {
          headers: {
            user_token: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Title>Employees </Title>
        <Button
          type="primary"
          size="middle"
          onClick={() => {
            setIsModalVisible(!isModalVisible);
          }}
        >
          New employee
        </Button>
      </div>
      <hr className="border-1 bg-gray-300" />
      <div>
        <table className="table-auto border-separate">
          <thead>
            <tr>
              <th>
                <Title level={5}>ID</Title>
              </th>
              <th className>
                <Title level={5}> Full Name</Title>
              </th>
              <th>
                <Title level={5}> Number Phone </Title>
              </th>
              <th>
                <Title level={5}> Email </Title>
              </th>
              <th>
                <Title level={5}> Job </Title>
              </th>
              <th>
                <Title level={5}> State </Title>
              </th>
              <th>
                <Title level={5}> City </Title>
              </th>
              <th>
                <Title level={5}> Actions </Title>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!employeesList && employeesList !== null ? (
              employeesList.map((employe) => {
                return (
                  <EmployeeItem
                    key={employe.id}
                    id={employe.id}
                    fullNameEmployee={employe.fullName}
                    numberPhoneEmployee={employe.numberPhone}
                    emailEmployee={employe.email}
                    jobEmployee={employe.job}
                    stateEmployee={employe.state}
                    cityEmployee={employe.city}
                  />
                );
              })
            ) : (
              <div>Loading</div>
            )}
          </tbody>
        </table>
        <div></div>
        <Modal
          title="New employee"
          visible={isModalVisible}
          onOk={() => {
            handleNewEmployee();
          }}
          onCancel={() => {
            handleCancel();
          }}
        >
          <Title level={5}>Full name</Title>
          <Input placeholder="Walter White" onChange={handleFullName} />
          <Title level={5} className="mt-4">
            Number phone
          </Title>
          <Input placeholder="9999993299" onChange={handleNumberPhone} />
          <Title level={5} className="mt-4">
            Email
          </Title>
          <Input placeholder="example@hotmail.com" onChange={handleEmail} />
          <Title level={5} className="mt-4">
            Job
          </Title>
          <Input placeholder="Carpinter" onChange={handleJob} />
          <Title level={5} className="mt-4">
            State
          </Title>
          <Input placeholder="California" onChange={handleState} />
          <Title level={5} className="mt-4">
            City
          </Title>
          <Input placeholder="Cancun" onChange={handleCity} />
        </Modal>
      </div>
    </div>
  );
};

export default Customers;
