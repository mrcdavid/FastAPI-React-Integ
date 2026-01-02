import React, { useEffect, useState } from 'react';
import AddFruitForm from './AddFruitForm';
import api from '../api';

const FruitList = () => {
  const [fruits, setFruits] = useState([]);

  const deleteFruit = async (index) => {
    try {
      await api.delete(`/fruits/${index}`);
      fetchFruits(); // refresh list
    } catch (error) {
      console.error("Error deleting fruit", error);
    }
  };


  const editFruit = async (index, currentName) => {
    const newName = prompt("Enter new fruit name:", currentName);
    if (!newName) return;

    try {
      await api.put(`/fruits/${index}`, { name: newName });
      fetchFruits(); // refresh list
    } catch (error) {
      console.error("Error editing fruit", error);
    }
  };


  const fetchFruits = async () => {
    try {
      const response = await api.get('/fruits');
      setFruits(response.data.fruits);
    } catch (error) {
      console.error("Error fetching fruits", error);
    }
  };

  const addFruit = async (fruitName) => {
    try {
      await api.post('/fruits', { name: fruitName });
      fetchFruits();  // Refresh the list after adding a fruit
    } catch (error) {
      console.error("Error adding fruit", error);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  return (
    <div>
      <h2>Fruits List</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            {fruit.name}{" "}
            <button onClick={() => editFruit(index, fruit.name)}>Edit</button>{" "}
            <button onClick={() => deleteFruit(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddFruitForm addFruit={addFruit} />
    </div>
  );
};

export default FruitList;