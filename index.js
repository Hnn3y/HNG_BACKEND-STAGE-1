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
  const digits = Math.abs(n).toString().split('').map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, d) => acc + d ** power, 0);
  return sum === Math.abs(n);
};

const digitSum = (n) => Math.abs(n)
  .toString()
  .split('')
  .reduce((acc, d) => acc + parseInt(d), 0);

app.get('/api/classify-number', async (req, res) => {
  const { number: numberParam } = req.query;

  if (!numberParam || isNaN(numberParam)) {
    return res.status(400).json({ number: numberParam, error: true });
  }

  const number = parseInt(numberParam);
  const prime = isPrime(number);
  const perfect = isPerfect(number);
  const armstrong = isArmstrong(number);
  const ds = digitSum(number);
  const properties = armstrong ? ['armstrong', number % 2 === 0 ? 'even' : 'odd'] : [number % 2 === 0 ? 'even' : 'odd'];

  let funFact = 'No fun fact available at the moment.';
  try {
    const response = await fetch(`http://numbersapi.com/${number}/math?json`);
    if (response.ok) {
      const data = await response.json();
      funFact = data.text;
    }
  } catch (err) {}

  res.json({
    number,
    is_prime: prime,
    is_perfect: perfect,
    properties,
    digit_sum: ds,
    fun_fact: funFact,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
