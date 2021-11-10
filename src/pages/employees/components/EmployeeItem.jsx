import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Typography, Modal, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { Text, Title } = Typography;

const EMPLOYEE_URL = "http://localhost:3001/api/employees/";

const EmployeeItem = ({
  id,
  fullNameEmployee,
  numberPhoneEmployee,
  emailEmployee,
  jobEmployee,
  stateEmployee,
  cityEmployee,
}) => {
  const token = Cookies.get("token");
  const deleteEmployee = (id) => {
    console.log(id);
    axios.delete(EMPLOYEE_URL + id, {
      headers: {
        user_token: token,
      },
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fullName, setFullName] = useState(fullNameEmployee);
  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const [numberPhone, setNumberPhone] = useState(numberPhoneEmployee);
  const handleNumberPhone = (event) => {
    setNumberPhone(event.target.value);
  };

  const [email, setEmail] = useState(emailEmployee);
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const [job, setJob] = useState(jobEmployee);
  const handleJob = (event) => {
    setJob(event.target.value);
  };

  const [state, setState] = useState(stateEmployee);
  const handleState = (event) => {
    setState(event.target.value);
  };

  const [city, setCity] = useState(cityEmployee);
  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const handleNewEmployee = () => {
    axios
      .put(
        EMPLOYEE_URL + id,
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
    <tr>
      <td>
        <Text>{id}</Text>
      </td>
      <td>
        <Text>{fullName}</Text>
      </td>
      <td>
        <Text>{numberPhone}</Text>
      </td>
      <td>
        <Text>{email}</Text>
      </td>
      <td>
        <Text>{job}</Text>
      </td>
      <td>
        <Text>{state}</Text>
      </td>
      <td>
        <Text>{city}</Text>
      </td>
      <td>
        <div>
          <Button
            type="default"
            size="small"
            onClick={() => {
              setIsModalVisible(!isModalVisible);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            size="small"
            className="ml-2"
            onClick={() => {
              deleteEmployee(id);
            }}
          >
            Delete
          </Button>
        </div>
      </td>
      <Modal
        title="Edit employee"
        visible={isModalVisible}
        onOk={() => {
          handleNewEmployee();
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        <Title level={5}>Full name</Title>
        <Input
          placeholder="Walter White"
          defaultValue={fullName}
          onChange={handleFullName}
        />
        <Title level={5} className="mt-4">
          Number phone
        </Title>
        <Input
          placeholder="9999993299"
          defaultValue={numberPhone}
          onChange={handleNumberPhone}
        />
        <Title level={5} className="mt-4">
          Email
        </Title>
        <Input
          placeholder="example@hotmail.com"
          defaultValue={email}
          onChange={handleEmail}
        />
        <Title level={5} className="mt-4">
          Job
        </Title>
        <Input
          placeholder="Carpinter"
          defaultValue={job}
          onChange={handleJob}
        />
        <Title level={5} className="mt-4">
          State
        </Title>
        <Input
          placeholder="California"
          defaultValue={state}
          onChange={handleState}
        />
        <Title level={5} className="mt-4">
          City
        </Title>
        <Input placeholder="Cancun" defaultValue={city} onChange={handleCity} />
      </Modal>
    </tr>
  );
};

export default EmployeeItem;
