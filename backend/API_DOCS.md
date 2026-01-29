# Appzeto Quiz API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### 1. Register User
- **Endpoint:** `POST /auth/signup`
- **Access:** Public
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "levelUnlocked": "easy",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  }
  ```

### 2. Login User
- **Endpoint:** `POST /auth/login`
- **Access:** Public
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "levelUnlocked": "easy",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  }
  ```

---

## Quiz

**Note:** All Quiz endpoints require the JWT Token in the registered header:
`Authorization: Bearer <your_token>`

### 3. Get Questions
- **Endpoint:** `GET /quiz/:category/:difficulty`
- **Access:** Protected
- **Parameters:**
  - `category`: (string) e.g., "Science", "History"
  - `difficulty`: (string) "easy", "medium", or "hard"
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "...",
      "category": "Science",
      "difficulty": "easy",
      "question": "What is H2O?",
      "options": ["Water", "Air", "Fire", "Earth"],
      "correctAnswer": "Water"
    },
    ... (10 random questions)
  ]
  ```

---

## Results

**Note:** All Result endpoints require the JWT Token in the registered header:
`Authorization: Bearer <your_token>`

### 4. Save Result
- **Endpoint:** `POST /result`
- **Access:** Protected
- **Body:**
  ```json
  {
    "category": "Science",
    "difficulty": "easy",
    "score": 8,
    "percentage": 80,
    "remark": "Good Job!"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "_id": "...",
    "user": "...",
    "category": "Science",
    ...
  }
  ```

### 5. Get User History
- **Endpoint:** `GET /result/user`
- **Access:** Protected
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "...",
      "category": "Science",
      "score": 8,
      "percentage": 80,
      "createdAt": "2023-01-01T12:00:00.000Z"
    },
    ...
  ]
  ```
