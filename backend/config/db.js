import { neon } from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config();

const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD } = process.env;

// creates a SQL connection using ENV variables 
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

// this SQL function we export is used as a tagged template literal, which allows is to write SQL queries safely