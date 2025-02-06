# HNG_BACKEND-STAGE-1

# Number Classification API

## Overview
The **Number Classification API** is a RESTful service that takes a number (or multiple numbers) as input and returns interesting mathematical properties, such as whether it is prime, perfect, or an Armstrong number, along with a fun fact.

## Features
- Checks if a number is **prime**
- Checks if a number is **perfect**
- Identifies **Armstrong numbers**
- Determines if the number is **even** or **odd**
- Computes the **sum of digits**
- Fetches a **fun fact** about the number using the [Numbers API](http://numbersapi.com/)

## Technologies Used
- **Node.js**
- **Express.js**
- **CORS** (Cross-Origin Resource Sharing)
- **Node-Fetch** (for fetching fun facts)

## API Endpoint
### `GET /api/classify-number`
#### **Query Parameters:**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| `number`  | string | A single number or a comma-separated list of numbers |

#### **Example Requests:**
1. **Single number:**
   ```sh
   GET /api/classify-number?number=371
   ```
2. **Multiple numbers:**
   ```sh
   GET /api/classify-number?number=5,28,153
   ```

#### **Successful Response (200 OK)**
```json
{
  "results": [
    {
      "number": 371,
      "is_prime": false,
      "is_perfect": false,
      "properties": ["armstrong", "odd"],
      "digit_sum": 11,
      "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
    }
  ]
}
```

#### **Error Response (400 Bad Request)**
```json
{
  "error": "Invalid input. Please enter valid numbers."
}
```

## Installation & Setup
### **1. Clone the repository**
```sh
git clone https://github.com/your-username/number-classification-api.git
cd number-classification-api
```

### **2. Install dependencies**
```sh
npm install
```

### **3. Run the server**
```sh
npm start
```
The API will be available at `http://localhost:3000`

## Deployment
1. Deploy using **Render, Vercel, or Railway**.
2. Ensure your public API URL is accessible.

## Additional Notes
- The API supports multiple numbers using a comma-separated format.
- CORS is enabled for cross-origin requests.
- If the Numbers API is unreachable, a default fun fact message is returned.


