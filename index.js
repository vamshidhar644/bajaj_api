const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  const numbers = [];
  const alphabets = [];

  function isAlphabet(char) {
    return /^[A-Za-z]$/.test(char);
  }

  for (const item of data) {
    if (typeof item === 'string') {
      if (isAlphabet(item)) {
        alphabets.push(item);
      } else if (!isNaN(parseFloat(item))) {
        numbers.push(item);
      }
    }
  }

  const highestAlphabet = alphabets
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .pop();

  const response = {
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: [highestAlphabet],
  };

  res.status(200).json(response);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
