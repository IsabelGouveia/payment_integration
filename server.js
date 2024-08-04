const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/create-order', async (req, res) => {
    console.log('API Key:', process.env.REVOLUT_API_KEY);
  try {
    const response = await axios.post(
      'https://sandbox-merchant.revolut.com/api/orders',
      {
        amount: 1, 
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

    res.json(response.data);
  } catch (error) {
    console.error('Error creating order:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    }
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


