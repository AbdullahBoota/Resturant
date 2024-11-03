// Cart.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';

const Cart = ({ cartItems, removeFromCart }) => {
  const [orderStatus, setOrderStatus] = useState('');

  const handlePlaceOrder = async () => {
    // Firestore mein order save karne ka logic
    const order = {
      items: cartItems,
      status: 'Preparing', // Initial status
      createdAt: new Date(),
    };

    await addDoc(collection(db, 'orders'), order);
    setOrderStatus('Order placed successfully!');
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {orderStatus && <p>{orderStatus}</p>}
    </div>
  );
};

export default Cart;
