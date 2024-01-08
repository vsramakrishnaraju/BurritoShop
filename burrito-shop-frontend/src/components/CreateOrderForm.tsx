import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define TypeScript types for the data
type Burrito = {
  _id: string;
  name: string;
  size: string;
  price: number;
};

type OrderItem = {
  burrito: string;
  quantity: number;
};

const CreateOrderForm: React.FC = () => {
  const [burritos, setBurritos] = useState<Burrito[]>([]);
  const [selectedBurritoId, setSelectedBurritoId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [orderPreview, setOrderPreview] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/burritos')
      .then(response => setBurritos(response.data))
      .catch(error => console.error('Error fetching burritos:', error));
  }, []);

  useEffect(() => {
    // This effect updates the order preview whenever the selectedBurritoId or quantity changes.
    const preview = generateOrderPreview();
    setOrderPreview(preview);
  }, [selectedBurritoId, quantity]);  // Dependencies on selectedBurritoId and quantity

  const handleBurritoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBurritoId(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value, 10) || 1);
  };

  const generateOrderPreview = (): string => {
    if (!selectedBurritoId) return '';

    const selectedBurrito = burritos.find(b => b._id === selectedBurritoId);
    if (!selectedBurrito) return '';

    const totalCost = selectedBurrito.price * quantity;
    const orderPreview = {
      items: [{ burrito: selectedBurritoId, quantity }],
      totalCost,
    };

    return JSON.stringify(orderPreview, null, 2);
  };

  const handleSubmitOrder = () => {
    const orderData = JSON.parse(orderPreview);
    axios.post('http://localhost:3000/api/orders', orderData)
      .then(response => {
        alert('Order submitted successfully!');
        setOrderPreview('');  // Clear the order preview
      })
      .catch(error => console.error('Error submitting order:', error));
  };

  return (
    <div>
      <h1>Create Your Burrito Order</h1>
      <div>
        <label htmlFor="burrito-select">Choose a burrito:</label>
        <select id="burrito-select" value={selectedBurritoId} onChange={handleBurritoChange}>
          <option value="">Select a Burrito</option>
          {burritos.map((burrito) => (
            <option key={burrito._id} value={burrito._id}>
              {burrito.name}
            </option>
          ))}
        </select>
        <label htmlFor="quantity-input">Quantity:</label>
        <input
          id="quantity-input"
          name="quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
      <div>
        <h2>Your Order Preview</h2>
        <pre>{orderPreview}</pre>
        <button onClick={handleSubmitOrder}>Submit Order</button>
      </div>
    </div>
  );
};

export default CreateOrderForm;
