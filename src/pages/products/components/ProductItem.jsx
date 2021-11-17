import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Typography, Modal, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const { Text, Title } = Typography;

const PRODUCT_URL = "http://localhost:3000/api/products/";

const ProductItem = ({
    id,
    nameProduct,
    descriptionProduct,
    priceProduct,
    price_per_kgProduct,
    stockProduct,
    require_id_to_sellProduct
}) => {
    const token = Cookies.get("token");
    
    const deleteProduct = (id) => {
        console.log(id);
        axios.delete(PRODUCT_URL + id, {
            headers: {
              user_token: token,
            },
        });
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [name, setName] = useState(nameProduct);
    const handleName = (event) => {
        setName(event.target.value);
    };

    const [description, setDescription] = useState(descriptionProduct);
    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const [price, setPrice] = useState(priceProduct);
    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const [price_per_kg, setPrice_per_kg] = useState(price_per_kgProduct);
    const handlePrice_per_kg = (event) => {
        setPrice_per_kg(event.target.value);
    };
    
    const [stock, setStock] = useState(stockProduct);
    const handleStock = (event) => {
        setStock(event.target.value);
    };

    const [require_id_to_sell, setRequire_id_to_sell] = useState(require_id_to_sellProduct);
    const handleRequire_id_to_sell = (event) => {
        setRequire_id_to_sell(event.target.value);
    };

    const handleNewProduct = () => {
        axios.put(
            PRODUCT_URL + id,
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
        <tr>
            <td>
                <Text style={{paddingRight: 15}}>{id}</Text>
            </td>
            <td style={{paddingRight: 15}}>
                <Text>{name}</Text>
            </td>
            <td style={{paddingRight: 15}}>
                <Text>{description}</Text>
            </td>
            <td style={{textAlign: 'center', paddingRight: 15}}>
                <Text>{price}</Text>
            </td>
            <td style={{textAlign: 'center', paddingRight: 15}}>
                <Text>{price_per_kg}</Text>
            </td>
            <td style={{textAlign: 'center', paddingRight: 15}}>
                <Text>{stock}</Text>
            </td>
            <td style={{textAlign: 'center', paddingRight: 15}}>
                { require_id_to_sell === true ? <Text>Yes</Text> : <Text>No</Text> }
            </td>
            <td>
                <div>
                    <Button type="default" size="small" onClick={() => { setIsModalVisible(!isModalVisible); }}>
                        Edit
                    </Button>
                    <Button danger size="small" className="ml-2" onClick={() => { deleteProduct(id); }}>
                        Delete
                    </Button>
                </div>
            </td>
            <Modal title="Edit product" visible={isModalVisible} onOk={() => { handleNewProduct(); }} onCancel={() => { handleCancel(); }}>
                <Title level={5}>Name</Title>
                <Input
                    placeholder=""
                    defaultValue={name}
                    onChange={handleName}
                />
                <Title level={5} className="mt-4">Description</Title>
                <Input
                    placeholder=""
                    defaultValue={description}
                    onChange={handleDescription}
                />
                <Title level={5} className="mt-4">Price</Title>
                <Input
                    placeholder=""
                    defaultValue={price}
                    onChange={handlePrice}
                />
                <Title level={5} className="mt-4">Price per kg</Title>
                <Input
                    placeholder=""
                    defaultValue={price_per_kg}
                    onChange={handlePrice_per_kg}
                />
                <Title level={5} className="mt-4">Stock</Title>
                <Input
                    placeholder=""
                    defaultValue={stock}
                    onChange={handleStock}
                />
                <Title level={5} className="mt-4">Require id to sell? (boolean)</Title>
                <Input
                    placeholder=""
                    defaultValue={require_id_to_sell}
                    onChange={handleRequire_id_to_sell}
                />
            </Modal>
        </tr>
    );
};

export default ProductItem;