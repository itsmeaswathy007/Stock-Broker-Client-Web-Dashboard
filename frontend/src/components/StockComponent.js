// src/components/StockComponent.js
import React from 'react';

const StockComponent = ({ stock, price }) => {
  return (
    <div>
      <h3>{stock}</h3>
      <p>Price: ${price}</p>
    </div>
  );
};

export default StockComponent;
