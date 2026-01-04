import React, { useState } from 'react';

const AddFruitForm = ({ addFruit }) => {
  const [nameOfFruit, setNameOfFruit] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nameOfFruit) {
      addFruit(nameOfFruit);
      setNameOfFruit('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nameOfFruit}
        onChange={(e) => setNameOfFruit(e.target.value)}
        placeholder="Enter fruit name"
      />
      {" "}<button type="submit">Add Fruit</button>
    </form>
  );
};

export default AddFruitForm;