import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateOrderForm from './components/CreateOrderForm';
import OrdersPage from './components/OrdersPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Order" element={<CreateOrderForm />} />
        <Route path="/Orders" element={<OrdersPage />} />
        <Route path="/" element={<Navigate replace to="/Order" />} />
      </Routes>
    </Router>
  );
};

export default App;
