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

# Application Management API

This API handles job application management, allowing users to apply for jobs, view their applications, and manage application statuses.

## **Routes and Descriptions**

### 1. **POST /apply**

- **Description:** Allows a user to apply for a job with a cover letter.
- **Middleware:** `authUser`
- **Request Body:**
  ```json
  {
    "jobId": "<jobId>",
    "coverLetter": "I am interested in this job because..."
  }
  ```
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Application created successfully",
    "NewApplication": {
      "userId": "<userId>",
      "jobId": "<jobId>",
      "coverLetter": "I am interested in this job..."
    }
  }
  ```

---

### 2. **GET /totalapplications/:id**

- **Description:** Retrieves all applications for a specific job.
- **Middleware:** `authUser`, `checkAdmin`
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Applications retrieved successfully",
    "TotalApplications": 5,
    "Applications": [{ "userId": "<userId>", "coverLetter": "..." }]
  }
  ```

---

### 3. **GET /myapplications**

- **Description:** Fetches all job applications submitted by the currently logged-in user.
- **Middleware:** `authUser`
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "User applications retrieved successfully",
    "TotalApplications": 2,
    "Applications": [{ "jobId": "<jobId>", "status": "pending" }]
  }
  ```

---

### 4. **GET /myapplication/:id**

- **Description:** Fetches a specific application by its ID.
- **Middleware:** `authUser`
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Application retrieved successfully",
    "Application": {
      "jobId": "<jobId>",
      "status": "pending",
      "coverLetter": "..."
    }
  }
  ```

---

### 5. **PUT /updateApplication/:id**

- **Description:** Updates the status of a specific job application.
- **Middleware:** `authUser`
- **Request Body:**
  ```json
  {
    "status": "accepted"
  }
  ```
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Application status updated successfully",
    "UpdatedApplication": {
      "status": "accepted"
    }
  }
  ```

---

### 6. **DELETE /deleteApplication/:id**

- **Description:** Deletes a job application by its ID.
- **Middleware:** `authUser`
- **Response Example:**
  ```json
  {
    "success": true,
    "message": "Application deleted successfully"
  }
  ```

---

## **Error Handling**

- Consistent error messages with HTTP status codes.
- Example:
  ```json
  {
    "success": false,
    "message": "Invalid job ID",
    "error": "Error message here"
  }
  ```

## **Models Used**

### **Application Schema:**

```javascript
{
    userId: ObjectId,
    jobId: ObjectId,
    status: { type: String, enum: ["pending", "accepted", "rejected"] },
    coverLetter: String
}
```

---

## 📌 Auth Middlewares:

This repository contains two essential middlewares for user authentication and authorization in an Express application for Admins:

1. **authUser**: Middleware to verify the user's authentication using JWT tokens.

2. **checkAdmin**: Middleware to verify if the authenticated user has an "admin" role.

3. **checkClient**: Ensures only users with the client role can post jobs.

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

Feel free to contribute and improve this project! 🚀

---
