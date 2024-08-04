const axios = require('axios');
require('dotenv').config();

const testRevolutAPI = async () => {
  try {
    const response = await axios.post(
      'https://sandbox-merchant.revolut.com/api/orders',
      {
        amount: 100, 
        currency: 'GBP',
        capture_mode: 'automatic',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REVOLUT_API_KEY}`,
          'Content-Type': 'application/json',
          'Revolut-Api-Version': '2023-09-01',
        },
      }
    );
    console.log('Order created successfully:', response.data);
  } catch (error) {
    console.error('Error creating order:', error.response ? error.response.data : error.message);
  }
};

testRevolutAPI();
