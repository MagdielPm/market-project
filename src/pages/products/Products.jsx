import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Button, Typography, Modal, Input } from "antd";
import axios from "axios";

import ProductItem from "./components/ProductItem";
import Cookies from "js-cookie";

//import { store } from "react-notifications-component";


const { Title } = Typography;

const PRODUCT_URL = "http://localhost:3000/api/products";

const Products = () => {
    const [productsList, setProductList] = useState(null);

    const token = Cookies.get("token");

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await axios.get(
                PRODUCT_URL,
                {
                    headers: {
                        user_token: token
                    }
                }
            );
            const products = productList.data.data;
            setProductList(products);
        };
        fetchProducts();
    }, [token]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [name, setName] = useState(null);
    const handleName = (event) => {
        setName(event.target.value);
    };

    const [description, setDescription] = useState(null);
    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const [price, setPrice] = useState(null);
    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const [price_per_kg, setPrice_per_kg] = useState(null);
    const handlePrice_per_kg = (event) => {
        setPrice_per_kg(event.target.value);
    };

    const [stock, setStock] = useState(null);
    const handleStock = (event) => {
        setStock(event.target.value);
    };

    const [require_id_to_sell, setRequire_id_to_sell] = useState(null);
    const handleRequire_id_to_sell = (event) => {
        setRequire_id_to_sell(event.target.value);
    };

    const handleNewProduct = () => {
        axios.post(
            PRODUCT_URL,
            {
                name: name,
                description: description,
                price: price,
                price_per_kg: price_per_kg,
                stock: stock,
                require_id_to_sell: require_id_to_sell
            },
            {
                headers: {
                    user_token: token
                }
            }
        ).then((response) => {
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
                <Title>Products</Title>
                <Button type="primary" size="middle" onClick={() => { setIsModalVisible(!isModalVisible); }}>
                    New product
                </Button>
            </div>
            <hr className="border-1 bg-gray-300" />
            <div>
                <table className="table-auto border-separate">
                    <thead>
                        <tr>
                            <th>
                                <Title level={5} style={{paddingRight: 15}}>ID</Title>
                            </th>
                            <th>
                                <Title level={5} style={{paddingRight: 15}}>Name</Title>
                            </th>
                            <th>
                                <Title level={5} style={{paddingRight: 15}}>Description</Title>
                            </th>
                            <th>
                                <Title level={5} style={{paddingRight: 15}}>Price</Title>
                            </th>
                            <th>
                                <Title level={5} style={{paddingRight: 15}}>Price per kg</Title>
                            </th>
                            <th>
                                <Title level={5} style={{paddingRight: 15}}>Stock</Title>
                            </th>
                            <th>
                                <Title level={5} style={{paddingRight: 15}}>Require id to sell</Title>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !!productsList && productsList != null ? (
                                productsList.map((product) => {
                                    return (
                                        <ProductItem 
                                            key={product.id}
                                            id={product.id}
                                            nameProduct={product.name}
                                            descriptionProduct={product.description}
                                            priceProduct={product.price}
                                            price_per_kgProduct={product.price_per_kg}
                                            stockProduct={product.stock}
                                            require_id_to_sellProduct={product.require_id_to_sell}
                                        />
                                    );
                                })
                            ) : (
                                <div>Loading</div>
                            )
                        }

                    </tbody>
                </table>
                <div></div>
                <Modal title="New product" visible={isModalVisible} onOk={() => { handleNewProduct(); }} onCancel={() => { handleCancel(); }}>
                    <Title level={5}>Name</Title>
                    <Input placeholder="" onChange={handleName} />
                    <Title level={5} className="mt-4">Description</Title>
                    <Input placeholder="" onChange={handleDescription} />
                    <Title level={5} className="mt-4">Price</Title>
                    <Input placeholder="" onChange={handlePrice} />
                    <Title level={5} className="mt-4">Price per kg</Title>
                    <Input placeholder="" onChange={handlePrice_per_kg} />
                    <Title level={5} className="mt-4">Stock</Title>
                    <Input placeholder="" onChange={handleStock} />
                    <Title level={5} className="mt-4">Require id to sell</Title>
                    <Input placeholder="" onChange={handleRequire_id_to_sell} />
                </Modal>
            </div>
        </div>
    );
};

export default Products;




















