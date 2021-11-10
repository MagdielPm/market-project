import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Typography, Modal, Input } from "antd";
import axios from "axios";

import FoodItem from "./components/FoodItem";
import Cookies from "js-cookie";

const { Title } = Typography;

const EMPLOYEES_URL = "http://localhost:3000/api/foods";

const Foods = () => {
  const [foodsList, setFoodList] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchFoods = async () => {
      const foodList = await axios.get(FOODS_URL, {
        headers: {
          user_token: token,
        },
      });
      const foods = foodList.data.data;
      setFoodList(foods);
    };
    fetchFoods();
  }, [token]);

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

  const handleNewFood = () => {
    axios
      .post(
        FOODS_URL,
        {
          foodName: foodName,
          foodDescription: foodDescription,
          ingredients: ingredients,
          foodPrice: foodPrice,
          foodExpiration: foodExpiration,
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
        <Title>Foods </Title>
        <Button
          type="primary"
          size="middle"
          onClick={() => {
            setIsModalVisible(!isModalVisible);
          }}
        >
          New food
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
                <Title level={5}> Food Name</Title>
              </th>
              <th>
                <Title level={5}> Food Description </Title>
              </th>
              <th>
                <Title level={5}> Ingredients </Title>
              </th>
              <th>
                <Title level={5}> Food Price </Title>
              </th>
              <th>
                <Title level={5}> Food Expiration </Title>
              </th>
              <th>
                <Title level={5}> Actions </Title>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!foodsList && foodsList !== null ? (
              foodsList.map((food) => {
                return (
                  <FoodItem
                    key={food.id}
                    id={food.id}
                    nameFood={food.foodName}
                    descriptionFood={food.foodDescription}
                    ingredientsFood={food.ingredients}
                    priceFood={food.foodPrice}
                    expirationFood={food.foodExpiration}
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
          title="New food"
          visible={isModalVisible}
          onOk={() => {
            handleNewFood();
          }}
          onCancel={() => {
            handleCancel();
          }}
        >
          <Title level={5}>Name Food</Title>
          <Input placeholder="Panuchos" onChange={handleFoodName} />
          <Title level={5} className="mt-4">
            Food Description
          </Title>
          <Input placeholder="Tortilla con frijol y pavo" onChange={handleFoodDescription} />
          <Title level={5} className="mt-4">
            Ingredients
          </Title>
          <Input placeholder="Tortilla, pavo, tomate, frijol" onChange={handleIngredients} />
          <Title level={5} className="mt-4">
            Food Price
          </Title>
          <Input placeholder="$45" onChange={handleFoodPrice} />
          <Title level={5} className="mt-4">
            Food Expiration
          </Title>
          <Input placeholder="10/11" onChange={handleFoodExpiration} />
    
        </Modal>
      </div>
    </div>
  );
};

export default Foods;
