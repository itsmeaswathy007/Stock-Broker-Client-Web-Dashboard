import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StockComponent from './StockComponent';

const supportedStocks = ['GOOG', 'TSLA', 'AMZN','META','NVDA' ];
const socket = io('http://localhost:4000');

const DashboardComponent = () => {
  const [subscribedStocks, setSubscribedStocks] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    socket.on('stockPrices', (newPrices) => {
      console.log('Received stock prices:', newPrices);
      const updatedPrices = {};
      subscribedStocks.forEach((stock) => {
        if (newPrices[stock]) {
          updatedPrices[stock] = newPrices[stock];
        }
      });
      setPrices(updatedPrices);
    });

    return () => {
      socket.off('stockPrices');
    };
  }, [subscribedStocks]);

  const handleSubscribe = (stock) => {
    if (!subscribedStocks.includes(stock)) {
      setSubscribedStocks([...subscribedStocks, stock]);
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '3em',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
    textAlign: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '30px',
  };

  const buttonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '1.2em',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  const stocksContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Dashboard</h2>
      <div style={buttonContainerStyle}>
        {supportedStocks.map((stock) => (
          <button
            key={stock}
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={() => handleSubscribe(stock)}
          >
            Subscribe to {stock}
          </button>
        ))}
      </div>
      <div style={stocksContainerStyle}>
        {subscribedStocks.map((stock) => (
          <StockComponent key={stock} stock={stock} price={prices[stock]} />
        ))}
      </div>
    </div>
  );
};

export default DashboardComponent;
