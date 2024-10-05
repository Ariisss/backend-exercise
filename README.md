# Node Backend Exercise

## Description
This project is a simple user management API built with Node.js and Express. It allows users to register, log in, and retrieve their profile information using JWT for authentication.

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Ariisss/node-exercise.git
   ```
2. Navigate to the project directory:
   ```bash
   cd project-name
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage
To run the project locally, use the following command:
```bash
npm start
```

This will start the server on `http://localhost:3000` (or your specified port).


## API Endpoints
Here are the main API endpoints available in the project:

- `POST /user/register` - Registers a new user.
- `POST /user/login` - Authenticates a user and returns a JWT token.
- `GET /user/profile` - Retrieves the authenticated user's profile information.

## Testing with Postman
To test the API endpoints using Postman, follow these steps:

1. **Open Postman** and create a new request.
2. **Set the request type** (POST or GET) based on the endpoint you want to test.

### Example Requests

- **Register User**:
  - **URL**: `http://localhost:3000/user/register`
  - **Method**: `POST`
  - **Body** (raw JSON):
    ```json
    {
        "username": "newuser",
        "password": "password123",
        "email": "newuser@example.com"
    }
    ```

- **Login User**:
  - **URL**: `http://localhost:3000/user/login`
  - **Method**: `POST`
  - **Body** (raw JSON):
    ```json
    {
        "email": "newuser@example.com",
        "password": "password123"
    }
    ```

- **Get User Profile**:
  - **URL**: `http://localhost:3000/user/profile`
  - **Method**: `GET`
  - **Headers**:
    ```
    "Authorization": "Bearer <your_jwt_token>"
    ```

3. **Click "Send"** to execute the request and view the response.
