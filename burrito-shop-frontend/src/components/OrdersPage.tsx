import React, { useState, useEffect } from 'react';
import axios from 'axios';

type OrderItem = {
    burrito: string;
    quantity: number;
    name: string
};

type Burrito = {
    _id: string;
    name: string;
    size: string;
    price: number;
};

type Order = {
    _id: string;
    items: OrderItem[];
    totalCost: number;
};

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [burritos, setBurritos] = useState<Burrito[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
        // Fetch burritos
        axios.get('http://localhost:3000/api/burritos')
            .then(response => setBurritos(response.data))
            .catch(error => console.error('Error fetching burritos:', error));
    }, []);

    // Function to find a burrito's name by its ID
    const getBurritoNameById = (id: string): string => {
        const burrito = burritos.find(burrito => burrito._id === id);
        return burrito ? burrito.name : 'Unknown';
    };

    const handleSelectOrder = (orderId: string) => {
        const order = orders.find(order => order._id === orderId);
        // If `order` is undefined (not found), setSelectedOrder should be called with `null`
        setSelectedOrder(order ?? null);
    };

    return (
        <div>
            <h1>Existing Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <p>
                                Order ID: {order._id}
                                <br />
                                Total Cost: ${order.totalCost.toFixed(2)}
                            </p>
                            <button onClick={() => handleSelectOrder(order._id)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders available.</p>
            )}

            {selectedOrder && (
                <div>
                    <h2>Order Details (ID: {selectedOrder._id})</h2>
                    <ul>
                        {selectedOrder.items.map((item, index) => (
                            <li key={index}>
                                Burrito Name: {getBurritoNameById(item.burrito)}, Quantity: {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total Cost: ${selectedOrder.totalCost.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;