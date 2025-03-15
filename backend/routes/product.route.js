import express from "express";
import { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();
// post Products
router.post('/', createProduct);

// Get all products
router.get("/",getAllProducts);

// get single product
router.get("/:id",getSingleProduct);

// update product
router.put("/:id",updateProduct);

// delete product
router.delete("/:id",deleteProduct);

export default router;