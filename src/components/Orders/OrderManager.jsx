import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderList from "./OrderList";
import OrderForm from "./OrderForm";

const OrderManager = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/orders`);
            setOrders(response.data);
        }
        catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <div>
            <OrderForm orders={orders} orderId={id} onOrderUpdated={fetchOrders} />
            <OrderList orders={orders} />
        </div>
    );
}

export default OrderManager;