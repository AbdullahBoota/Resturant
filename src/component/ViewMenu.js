// src/component/ViewMenu.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ViewMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'menuItems'));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenuItems(items);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="view-menu-container">
      <h1>Our Menu</h1>
      <ul className="menu-items-list">
        {menuItems.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMenu;
