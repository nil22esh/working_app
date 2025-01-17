# Backend Folder Structure

This project follows a structured backend folder setup using Node.js, Express, and Mongoose for a clean and scalable architecture.

# 📂 Backend Folder Overview:

## User Management API:

### controllers

- Contains the `user.controller.js` file for handling request logic and interacting with the repository layer.

### db

- Database connection logic is stored here for MongoDB integration.

### middlewares

- Custom middleware files like `authUser.middleware.js` and `isAdmin.middleware.js` for authentication and authorization purposes.

### models

- The `user.schema.js` file defines the Mongoose schema and model for user data.

### repository

- The `user.repository.js` file handles direct database interactions, separating data access logic.

### routes

- The `user.routes.js` file defines all user-related API routes, connecting controllers to route endpoints.

### node_modules

- Auto-generated folder for dependencies managed by npm.

### Other Files

- `.env` - Environment variables configuration.
- `app.js` - Main entry point of the server, initializes middleware and routes.
- `package.json` - Manages project dependencies and scripts.
- `package-lock.json` - Locks the versions of installed packages.

---

## 📌 Routes Explanation:

### User Routes (user.routes.js)

- **POST /api/v1/users/register**

  - Registers a new user.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "phone": "1234567890",
      "role": "worker"
    }
    ```
  - **Response Example:**
    ```json
    {
      "success": true,
      "message": "User registered successfully!"
    }
    ```

- **POST /api/v1/users/login**

  - Authenticates a user.
  - **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response Example:**
    ```json
    {
      "success": true,
      "message": "User LoggedIn Successfully!"
    }
    ```

- **GET /api/v1/users/profile/:id**

  - Fetches a user's profile by ID.

- **GET /api/v1/users/all**

  - Retrieves all registered users.

- **GET /health**
  - Health check endpoint to ensure the server is running.

---

## Job Management API:

This project provides a job management API for creating, retrieving, updating, and deleting job postings. The backend is built using Node.js, Express, and MongoDB.

---

## Routes

### POST /api/jobs

- **Description:** Creates a new job posting. Requires a valid user token with the role of `client`.
- **Request Body:**

```json
{
  "title": "Gardener Needed",
  "description": "Looking for a professional gardener with experience.",
  "skillsrequired": ["gardener"],
  "urgency": "high",
  "duration": "2 weeks",
  "payrate": "200 USD",
  "location": "New York",
  "startDate": "2025-01-20",
  "endDate": "2025-02-01"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "New job posted successfully!",
  "NewJob": {...}
}
```

### GET /api/jobs

- **Description:** Fetches all job postings.
- **Response:**

```json
{
  "success": true,
  "message": "All jobs fetched successfully!",
  "TotalJobs": 3,
  "AllJobs": [{...}]
}
```

### GET /api/jobs/user

- **Description:** Fetches all jobs posted by the authenticated user.
- **Response:**

```json
{
  "success": true,
  "message": "User's jobs fetched successfully!",
  "TotalJobs": 2,
  "UserJobs": [{...}]
}
```

### GET /api/jobs/:id

- **Description:** Fetches a specific job by its ID.
- **Response:**

```json
{
  "success": true,
  "message": "Job fetched successfully!",
  "Job": {...}
}
```

### PUT /api/jobs/:id

- **Description:** Updates a job posting by its ID.
- **Request Body:**

```json
{
  "title": "Updated Gardener Job",
  "urgency": "urgent"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Job updated successfully!",
  "UpdatedJob": {...}
}
```

### DELETE /api/jobs/:id

- **Description:** Deletes a job posting by its ID.
- **Response:**

```json
{
  "success": true,
  "message": "Job deleted successfully!",
  "DeletedJob": {...}
}
```

---

# Skill Verification API

## Routes and Descriptions

### POST `/requestverify`

- **Description:** Allows a user to request skill verification.
- **Response Example:**

```json
{
  "success": true,
  "message": "Skill verification request sent successfully",
  "data": { "skill": "JavaScript", "status": "pending" }
}
```

### GET `/skillverification/status/:id`

- **Description:** Fetch the status of a specific skill verification request.
- **Response Example:**

```json
{
  "success": true,
  "message": "Skill verification status retrieved successfully",
  "data": "pending"
}
```

### GET `/allskills`

- **Description:** Retrieve all skill verifications (admin access required).
- **Response Example:**

```json
{
  "success": true,
  "message": "All skill verifications retrieved successfully",
  "TotalCount": 5,
  "data": [{ "skill": "Python", "status": "passed" }]
}
```

### PUT `/verifyskill/:id`

- **Description:** Update the status of a skill verification request (admin access required).
- **Response Example:**

```json
{
  "success": true,
  "message": "Skill verification updated successfully",
  "data": { "skill": "Java", "status": "passed" }
}
```

### DELETE `/deleteskill/:id`

- **Description:** Delete a specific skill verification request (admin access required).
- **Response Example:**

```json
{
  "success": true,
  "message": "Skill verification deleted successfully"
}
```

---

# Notification Service API

This **Notification Service API** handles the creation, retrieval, updating, and deletion of user notifications. It ensures secure access through authentication middleware.

## **Routes and Descriptions**

### 1. Send Notification

**Endpoint:**

```
POST /api/notifications/send-notifications
```

**Description:** Sends a new notification to a specific user. The user must be authenticated.

**Request Body:**

```json
{
  "type": "job-match",
  "message": "You have a new job match!"
}
```

**Response Example:**

```json
{
  "success": true,
  "message": "Notification sent successfully.",
  "SentNotification": {
    "_id": "64f31b2d9c1234567",
    "userId": "64f31b2d9c1234567",
    "type": "job-match",
    "message": "You have a new job match!",
    "read": false
  }
}
```

---

### 2. Get User Notifications

**Endpoint:**

```
GET /api/notifications/user-notifications
```

**Description:** Fetches all notifications for the authenticated user.

**Response Example:**

```json
{
  "success": true,
  "message": "User notifications retrieved successfully.",
  "TotalCount": 2,
  "Notifications": [
    {
      "_id": "64f31b2d9c1234567",
      "type": "application-status",
      "message": "Your application has been accepted!",
      "read": false
    }
  ]
}
```

---

### 3. Mark Notification as Read

**Endpoint:**

```
PUT /api/notifications/update/user-notifications/:id
```

**Description:** Marks a specific notification as read by its ID. The user must be authenticated.

**Response Example:**

```json
{
  "success": true,
  "message": "Notification marked as read successfully.",
  "UpdatedNotification": {
    "_id": "64f31b2d9c1234567",
    "type": "job-match",
    "message": "You have a new job match!",
    "read": true
  }
}
```

---

### 4. Delete Notification

**Endpoint:**

```
DELETE /api/notifications/delete-user-notifications/:id
```

**Description:** Deletes a notification by its ID for the authenticated user.

**Response Example:**

```json
{
  "success": true,
  "message": "Notification deleted successfully."
}
```

---

## Notification Routes

### **POST** `/send-notifications`

- **Description:** Send a notification to a user.
- **Response Example:**

```json
{
  "message": "Notification sent successfully!"
}
```

### **GET** `/user-notifications`

- **Description:** Get all notifications for the authenticated user.
- **Response Example:**

```json
[
  {
    "id": "1",
    "message": "New job posted!",
    "read": false
  }
]
```

### **PUT** `/update/user-notifications/:id`

- **Description:** Mark a notification as read.
- **Response Example:**

```json
{
  "message": "Notification marked as read."
}
```

### **DELETE** `/delete-user-notifications/:id`

- **Description:** Delete a notification.
- **Response Example:**

```json
{
  "message": "Notification deleted successfully."
}
```

## Skill Verification Routes

### **POST** `/requestverify`

- **Description:** Request skill verification for a user.
- **Response Example:**

```json
{
  "message": "Skill verification requested successfully."
}
```

### **GET** `/skillverification/status/:id`

- **Description:** Get the skill verification status of a user.
- **Response Example:**

```json
{
  "status": "Pending"
}
```

### **GET** `/allskills`

- **Description:** Get all skill verifications (Admin only).
- **Response Example:**

```json
[
  {
    "user": "John Doe",
    "skill": "Carpentry",
    "status": "Verified"
  }
]
```

### **PUT** `/verifyskill/:id`

- **Description:** Verify a user's skill (Admin only).
- **Response Example:**

```json
{
  "message": "Skill verified successfully."
}
```

### **DELETE** `/deleteskill/:id`

- **Description:** Delete a skill verification record (Admin only).
- **Response Example:**

```json
{
  "message": "Skill verification deleted successfully."
}
```

## Search and Match Routes

### **POST** `/search/workers`

- **Description:** Search for workers based on skill.
- **Response Example:**

```json
[
  {
    "worker": "John Doe",
    "skills": ["Carpentry", "Plumbing"]
  }
]
```

### **POST** `/search/jobs`

- **Description:** Search for jobs based on skills.
- **Response Example:**

```json
[
  {
    "jobTitle": "Plumber Needed",
    "requiredSkills": ["Plumbing"]
  }
]
```

### **POST** `/match/worker`

- **Description:** Match a worker to a job.
- **Response Example:**

```json
{
  "message": "Worker matched successfully."
}
```

### **GET** `/recommend/jobs`

- **Description:** Get recommended jobs for a worker.
- **Response Example:**

```json
[
  {
    "jobTitle": "Electrician Required",
    "location": "Delhi"
  }
]
```

### **GET** `/recommend/workers/:jobId`

- **Description:** Get recommended workers for a specific job.
- **Response Example:**

```json
[
  {
    "worker": "Jane Doe",
    "skills": ["Welding"]
  }
]
```

## Payment Routes

### **POST** `/create`

- **Description:** Create a payment request.
- **Response Example:**

```json
{
  "message": "Payment request created successfully."
}
```

### **PUT** `/process/:paymentId`

- **Description:** Process a payment.
- **Response Example:**

```json
{
  "message": "Payment processed successfully."
}
```

### **GET** `/status/:paymentId`

- **Description:** Get the status of a payment.
- **Response Example:**

```json
{
  "status": "Completed"
}
```

### **POST** `/refund/:paymentId`

- **Description:** Refund a payment (Admin only).
- **Response Example:**

```json
{
  "message": "Payment refunded successfully."
}
```

### **GET** `/history`

- **Description:** Get payment history for the authenticated user.
- **Response Example:**

```json
[
  {
    "paymentId": "12345",
    "amount": "1000",
    "status": "Completed"
  }
]
```

---

## Error Handling

- Standardized error responses are returned with:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

---

## 📌 Auth Middlewares:

This repository contains two essential middlewares for user authentication and authorization in an Express application for Admins:

1. **authUser**: Middleware to verify the user's authentication using JWT tokens.

2. **checkAdmin**: Middleware to verify if the authenticated user has an "admin" role.

3. **checkClient**: Ensures only users with the client role can post jobs.

4. **uploadFileMiddleware**: Ensures to uploading files functionality.

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JWT
- Cookie-Parser
- Express-Validation
- Multer
- Nodemailer

Feel free to contribute and improve this project! 🚀

---
