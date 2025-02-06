import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const isPerfect = (n) => {
  if (n < 2) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) sum += n / i;
    }
  }
  return sum === n;
};

const isArmstrong = (n) => {
  const digits = Math.abs(n).toString().split('');
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(parseInt(d), power), 0);
  return sum === Math.abs(n);
};

const digitSum = (n) =>
  Math.abs(n)
    .toString()
    .split('')
    .reduce((acc, d) => acc + parseInt(d), 0);

app.get('/api/classify-number', async (req, res) => {
  const numberParam = req.query.number;

  if (!numberParam) {
    return res.status(400).json({ number: "undefined", error: true });
  }

  const number = parseInt(numberParam);
  if (isNaN(number)) {
    return res.status(400).json({ number: numberParam, error: true });
  }

  const prime = isPrime(number);
  const perfect = isPerfect(number);
  const armstrong = isArmstrong(number);
  const ds = digitSum(number);

  let properties = [];
  if (armstrong) properties.push('armstrong');
  properties.push(number % 2 === 0 ? 'even' : 'odd');

  let funFact = 'No fun fact available.';
  try {
    const response = await fetch(`http://numbersapi.com/${number}/math?json`);
    if (response.ok) {
      const data = await response.json();
      funFact = data.text || funFact;
    }
  } catch (error) {
    console.error('Error fetching fun fact:', error);
  }

  return res.status(200).json({
    number,
    is_prime: prime,
    is_perfect: perfect,
    properties,
    digit_sum: ds,
    fun_fact: funFact,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
