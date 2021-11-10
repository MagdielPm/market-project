import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Typography, Modal, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { Text, Title } = Typography;

const EMPLOYEE_URL = "http://localhost:3000/api/foods/";

const EmployeeItem = ({
  id,
  foodName,
  foodDescription,
  ingredients,
  foodPrice,
  foodExpiration,
}) => {
  const token = Cookies.get("token");
  const deleteFood = (id) => {
    console.log(id);
    axios.delete(FOOD_URL + id, {
      headers: {
        user_token: token,
      },
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [foodName, setFoodName] = useState("");
  const handleFoodName = (event) => {
    setFoodName(event.target.value);
  };

  const [foodDescription, setFoodDescription] = useState("");
  const handleFoodDescription = (event) => {
    setFoodDescription(event.target.value);
  };

  const [ingredients, setIngredients] = useState("");
  const handleIngredients = (event) => {
    setIngredients(event.target.value);
  };

  const [foodPrice, setFoodPrice] = useState("");
  const handleFoodPrice = (event) => {
    setFoodPrice(event.target.value);
  };

  const [foodExpiration, setFoodExpiration] = useState("");
  const handleFoodExpiration = (event) => {
    setFoodExpiration(event.target.value);
  };

  const handleNewFood= () => {
    axios
      .put(
        FOOD_URL + id,
        {
          foodName: foodName,
          foodDescription: foodDescription,
          ingredients: ingredients,
          foodPrice: foodPrice,
          foodExpiration: foodExpiration
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
        <Text>{foodName}</Text>
      </td>
      <td>
        <Text>{foodDescription}</Text>
      </td>
      <td>
        <Text>{ingredients}</Text>
      </td>
      <td>
        <Text>{foodPrice}</Text>
      </td>
      <td>
        <Text>{foodExpiration}</Text>
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
              deleteFood(id);
            }}
          >
            Delete
          </Button>
        </div>
      </td>
      <Modal
        title="Edit food"
        visible={isModalVisible}
        onOk={() => {
          handleNewFood();
        }}
        onCancel={() => {
          handleCancel();
        }}
      >
        <Title level={5}>Food Name</Title>
        <Input
          placeholder="Panuchos"
          defaultValue={foodName}
          onChange={handleFoodName}
        />
        <Title level={5} className="mt-4">
         Food Description
        </Title>
        <Input
          placeholder="Tortilla con frijol y pavo"
          defaultValue={foodDescription}
          onChange={handleFoodDescription}
        />
        <Title level={5} className="mt-4">
          Ingredients
        </Title>
        <Input
          placeholder="Tortilla, pavo, tomate, frijol"
          defaultValue={ingredients}
          onChange={handleIngredients}
        />
        <Title level={5} className="mt-4">
          Food Price
        </Title>
        <Input
          placeholder="$45"
          defaultValue={foodPrice}
          onChange={handleFoodPrice}
        />
        <Title level={5} className="mt-4">
          Food Expiration
        </Title>
        <Input
          placeholder="10/11"
          defaultValue={foodExpiration}
          onChange={handleFoodExpiration}
        />
        
      </Modal>
    </tr>
  );
};

export default FoodItem;
