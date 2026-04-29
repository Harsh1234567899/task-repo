# Task Management API





## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh1234567899/task-repo.git
   cd task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/task-db
     PORT=3000
     ACCESS_TOKEN_SECRET=your_jwt_secret_key_here
     ACCESS_TOKEN_EXPIRY=1d
     REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_key_here
     REFRESH_TOKEN_EXPIRY=10d
     ```
   - Update `MONGODB_URI` with your MongoDB connection string
   - Replace `your_jwt_secret_key_here` with a strong secret key

## Running the Application

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file)




## API Endpoints

### Users
- `POST /api/users/register` - Create a new user
- `GET /api/users/` - Get all users
- `GET /api/users/login` - Get user by ID

### Tasks
- `POST /api/tasks/create` - Create a new task
- `GET /api/tasks/` - Get all tasks
- `GET /api/tasks/user-all` - Get task of user
- `PUT /api/tasks/:id` - Update task


