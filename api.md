# Expense Tracker API Documentation

This API allows you to manage expenses and incomes, retrieve transactions, and gather data for dashboards. Below are the endpoints, request methods, and sample usage for each feature.

---

## 1. **Create Expense**

- **Endpoint**: `/api/transactions/expenses`
- **Method**: `POST`
- **Description**: Create a new expense.
- **Request Body**:
  ```json
  {
    "title": "Groceries",
    "amount": 1200.00,
    "date": "2024-09-13",
    "category": "Food",
    "description": "Monthly grocery shopping"
  }

## 2. **Create Income**

- **Endpoint**: `/api/transactions/incomes`
- **Method**: `POST`
- **Description**: Create a new income.
- **Request Body**:
  ```json
  {
  "title": "Salary",
  "amount": 50000.00,
  "date": "2024-09-13",
  "description": "September salary"
  }

## 3. **Get All Transactions**

- **Endpoint**: `/api/transactions`
- **Method**: `GET`
- **Description**: Retrieve all transactions (expenses and incomes) with pagination.
- **Query Parameters**:
  - `page` (optional): The page number to retrieve (default: 1)
  - `limit` (optional): The number of transactions per page (default: 10)
- **Example**: `/api/transactions?page=1&limit=10`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Groceries",
      "amount": 1200.00,
      "date": "2024-09-13",
      "category": "Food",
      "description": "Monthly grocery shopping",
      "type": "expense"
    },
    {
      "id": 2,
      "title": "Salary",
      "amount": 50000.00,
      "date": "2024-09-13",
      "description": "September salary",
      "type": "income"
    }
  ]

## 4. **Get All Expenses**

- **Endpoint**: `/api/dashboard/allExpenses`
- **Method**: `GET`
- **Description**: Retrieve all expenses for the dashboard.
- **Response**:
  ```json
  {
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Groceries",
      "amount": 1200.00,
      "date": "2024-09-13",
      "category": "Food",
      "description": "Monthly grocery shopping"
    }
  ]
  }

## 5. **Get All Expenses with Specific Time Period**

- **Endpoint**: `/api/dashboard/expenses`
- **Method**: `GET`
- **Description**: Retrieve all expenses within a specific time period for the dashboard.
- **Query Parameters**:
  - `startDate` (required): The start date of the time period (format: YYYY-MM-DD)
  - `endDate` (required): The end date of the time period (format: YYYY-MM-DD)
- **Example**: `/api/dashboard/expenses?startDate=2024-09-01&endDate=2024-09-30`

## 6. **Get All Incomes**

- **Endpoint**: `/api/dashboard/totalIncome`
- **Method**: `GET`
- **Description**: Retrieve all incomes for the dashboard.
- **Response**:
  ```json
  {
  "success": true,
  "data": [
    {
      "id": 2,
      "title": "Salary",
      "amount": 50000.00,
      "date": "2024-09-13",
      "description": "September salary"
    }
  ]
  }

## 7. **Get Total Income within a Specific Time Period**

- **Endpoint**: `/api/dashboard/income`
- **Method**: `GET`
- **Description**: Retrieve the total income within a specific time period for the dashboard.
- **Query Parameters**:
  - `startDate` (required): The start date of the time period (format: YYYY-MM-DD)
  - `endDate` (required): The end date of the time period (format: YYYY-MM-DD)
- **Example**: `/api/dashboard/income?startDate=2024-09-01&endDate=2024-09-30`
- **Response**:
  ```json
  {
  "success": true,
  "data": 50000.00
  }