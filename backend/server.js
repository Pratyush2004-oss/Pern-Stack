import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// importing the routes
import productRoute from "./routes/product.route.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();
const app = express();

app.use(express.json()); // 
app.use(helmet()); // helmet is a security middleware that helps you to protect your app bby setting various HTTP headers
app.use(morgan('dev')); // log the request
app.use(cors());
const PORT = process.env.PORT || 3000;

// applyour chat rate limit to all the routes
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {
            requested: 1 // specifies that each request consumes 1 token
        });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: "Too Many Requests" })
            }
            else if (decision.reason.isBot()) {
                res.status(403).json({ error: "Bot Access Denied" })
            }
            else {
                res.status(403).json({ error: "Forbidden" })
            }
            return;
        }

        // check for spoofed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({ error: "Spoofed bot detected" })
        }
        next();
    } catch (error) {
        console.log("Arcjet Error : ", error);
        next(error);
    }
})

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