import dotenv from 'dotenv';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Check if the environment is development or production
export const NODE_ENV = process.env.NODE_ENV;

// Export environment server variables
export const PORT = process.env.PORT;

// Export environment database variables
export const DATABASE_URL = process.env.DATABASE_URL;
export const PASSWORD = process.env.PASSWORD;

// Export environment jwt variables
export const JWT_SECRET = process.env.JWT_SECRET;

