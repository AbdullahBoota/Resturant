// src/component/MenuManagement.js
import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebaseConfig'; 
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [editingItemId, setEditingItemId] = useState('');

  const fetchMenuItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'menuItems'));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenuItems(items);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const uploadImage = async (imageFile) => {
    const imageRef = ref(storage, `menuImages/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return getDownloadURL(imageRef);
  };

  // Function to get the image URL for an existing item
  const getImageUrl = async (itemId) => {
    const docRef = doc(db, 'menuItems', itemId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().imageUrl;
    } else {
      console.log("No such document!");
      return null;
    }
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    const imageUrl = image ? await uploadImage(image) : null;

    if (editingItemId) {
      await updateDoc(doc(db, 'menuItems', editingItemId), {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl: imageUrl || (await getImageUrl(editingItemId)),
      });
    } else {
      await addDoc(collection(db, 'menuItems'), {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl,
      });
    }
    resetForm();
    fetchMenuItems();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage(null);
    setEditingItemId('');
  };

  const handleEditItem = (item) => {
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setEditingItemId(item.id);
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, 'menuItems', id));
    fetchMenuItems();
  };

  return (
    <div className="menu-management-container">
      <h1>Menu Management</h1>
      <form className="menu-form" onSubmit={handleAddOrUpdateItem}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="submit-button">{editingItemId ? 'Update Item' : 'Add Menu Item'}</button>
      </form>

      <h2>Menu Items</h2>
      <ul className="menu-items-list">
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price} - {item.category}
            <button onClick={() => handleEditItem(item)} className="edit-button">Edit</button>
            <button onClick={() => handleDeleteItem(item.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuManagement;
