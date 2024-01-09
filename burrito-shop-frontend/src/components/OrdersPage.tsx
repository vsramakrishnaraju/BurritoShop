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
    // State for the new burrito form
    const [newBurrito, setNewBurrito] = useState({ name: '', size: 'regular', price: 0 });
    const [submitStatus, setSubmitStatus] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/orders')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
        // Fetch burritos
        axios.get('http://localhost:3001/api/burritos')
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

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'price') {
            setNewBurrito({ ...newBurrito, price: Math.floor(Number(value)) });
        } else {
            setNewBurrito({ ...newBurrito, [name]: value });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitting the following JSON to the API:', JSON.stringify(newBurrito));
        setSubmitStatus('Posting to API...'); // To show the posting status
        
        axios.post('http://localhost:3001/api/burritos', newBurrito)
            .then(response => {
                console.log('Burrito added:', response.data);
                setBurritos([...burritos, response.data]);
                setSubmitStatus('Posted successfully!'); // Update the status on success
            })
            .catch(error => {
                console.error('Error adding burrito:', error);
                setSubmitStatus(`Failed to post: ${error.message}`); // Update the status on error
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Existing Orders Display */}
            <div style={{ width: '50%' }}>
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
    
            {/* Form for Adding New Burritos */}
            <div style={{ width: '50%' }}>
                <h1>Add New Burrito</h1>
                {submitStatus && <p>{submitStatus}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={newBurrito.name} onChange={handleFormChange} />
                    </label>
                    <br />
                    <label>
                        Size:
                        <select name="size" value={newBurrito.size} onChange={handleFormChange}>
                            <option value="regular">Regular</option>
                            <option value="XL">XL</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Price (Integer Only):
                        <input type="number" name="price" value={newBurrito.price} onChange={handleFormChange} min="0" step="1" />
                    </label>
                    <br />
                    <button type="submit">Add Burrito</button>
                </form>
                {/* Display the JSON data to be submitted */}
                {newBurrito.name && <pre>{JSON.stringify(newBurrito, null, 2)}</pre>}
            </div>
        </div>
    );    
};

export default OrdersPage;