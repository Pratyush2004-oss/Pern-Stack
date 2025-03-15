import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// importing the routes
import productRoute from "./routes/product.route.js";
import { sql } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json()); // 
app.use(helmet()); // helmet is a security middleware that helps you to protect your app bby setting various HTTP headers
app.use(morgan('dev')); // log the request
app.use(cors());
const PORT = process.env.PORT || 3000;

// calling the routes
app.use("/api/v1/products", productRoute);

async function initializeDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `
        console.log("Database Initialized successfully")
    } catch (error) {
        console.log("Error in initializing DB : ", error);
    }

}

initializeDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})