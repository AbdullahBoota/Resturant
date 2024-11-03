import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, getDocs } from 'firebase/firestore';

const OrderManagement = () => {
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Test Item', price: 10, category: 'Category1' },
    { id: '2', name: 'Sample Item', price: 15, category: 'Category2' }
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [customizations, setCustomizations] = useState({});
  const [orderStatus, setOrderStatus] = useState('');

  // Fetch menu items from Firestore
  const fetchMenuItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'menuItems'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Only update menuItems if Firestore has data
      if (items.length > 0) {
        setMenuItems(items);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();

    // Real-time listener for order status
    const unsubscribe = onSnapshot(collection(db, 'orders'), snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'modified') {
          const updatedOrder = change.doc.data();
          setOrderStatus(updatedOrder.status);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, customizations: customizations[item.id] || {} }]);
  };

  // Handle customization changes
  const handleCustomizationChange = (itemId, customization) => {
    setCustomizations(prev => ({
      ...prev,
      [itemId]: customization,
    }));
  };

  // Place the order
  const handlePlaceOrder = async () => {
    const order = {
      items: cartItems,
      status: 'Preparing',
    };
    await addDoc(collection(db, 'orders'), order);
    setOrderStatus('Preparing');
    setCartItems([]); // Clear cart after placing order
  };

  return (
    <div className="order-management-container">
      <h1>Order Management</h1>

      <h2>Menu Items</h2>
      <ul className="menu-items-list">
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <li key={item.id} className="menu-item">
              {item.name} - ${item.price} - {item.category}
              <div className="customization">
                <label>
                  Toppings:
                  <input 
                    type="text"
                    onChange={(e) => handleCustomizationChange(item.id, { ...customizations[item.id], toppings: e.target.value })}
                  />
                </label>
                <label>
                  Spice Level:
                  <select 
                    onChange={(e) => handleCustomizationChange(item.id, { ...customizations[item.id], spiceLevel: e.target.value })}
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Spicy">Spicy</option>
                  </select>
                </label>
              </div>
              <button onClick={() => addToCart(item)} className="add-to-cart-button">Add to Cart</button>
            </li>
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </ul>

      <h2>Cart</h2>
      <ul className="cart-items-list">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} 
              <div>Customizations: {item.customizations.toppings || 'None'}, {item.customizations.spiceLevel || 'Mild'}</div>
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
      {cartItems.length > 0 && (
        <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
      )}

      <h2>Order Status</h2>
      <div className="order-status">
        {orderStatus || 'No orders placed'}
      </div>
    </div>
  );
};

export default OrderManagement;
