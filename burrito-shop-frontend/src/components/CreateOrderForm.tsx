import React, { useState, useEffect, useCallback } from 'react';

// Define TypeScript types for the data
type Burrito = {
  _id: string;
  name: string;
  size: string;
  price: number;
};

const CreateOrderForm: React.FC = () => {
  const [burritos, setBurritos] = useState<Burrito[]>([]);
  const [selectedBurritoId, setSelectedBurritoId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [orderPreview, setOrderPreview] = useState<string>('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/burritos`)
      .then(response => response.json())
      .then(data => setBurritos(data))
      .catch(error => console.error('Error fetching burritos:', error));
  }, []);

  const generateOrderPreview = useCallback((): string => {
    if (!selectedBurritoId) return '';

    const selectedBurrito = burritos.find(b => b._id === selectedBurritoId);
    if (!selectedBurrito) return '';

    const totalCost = selectedBurrito.price * quantity;
    const orderPreview = {
      items: [{ burrito: selectedBurritoId, quantity }],
      totalCost,
    };

    return JSON.stringify(orderPreview, null, 2);
  }, [burritos, selectedBurritoId, quantity]);

  useEffect(() => {
    const preview = generateOrderPreview();
    setOrderPreview(preview);
  }, [selectedBurritoId, quantity, generateOrderPreview]);

  const handleBurritoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBurritoId(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value, 10) || 1);
  };

  const handleSubmitOrder = () => {
    const orderData = JSON.parse(orderPreview);
    fetch(`http://localhost:3001/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
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
