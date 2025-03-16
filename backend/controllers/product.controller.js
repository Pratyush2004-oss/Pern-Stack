import { sql } from "../config/db.js";

// create product
export const createProduct = async (req, res, next) => {
    const { name, image, description, price } = req.body;

    if (!name || !image || !description || !price) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const newProduct = await sql`
        INSERT INTO products(name, price, image, description)
        VALUES (${name}, ${price}, ${image}, ${description})
        RETURNING *
        `
        res.status(201).json({
            success: true,
            data: newProduct[0],
            message: "New Product created successfully"
        })

    } catch (error) {
        console.log("Error in creating Product controller : ", error)
        next(error);
    }

}

// get all products
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log("Error in getting All Products controller : ", error)
        next(error);
    }
}

// get single product
export const getSingleProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await sql`
        SELECT * FROM products
        WHERE id = ${id}
        `
        res.status(200).json({
            success: true,
            data: product[0]
        })
    } catch (error) {
        console.log("Error in getting Single Product controller : ", error)
        next(error);
    }

}

// update product
export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, image, description, price } = req.body;

    try {
        const product = await sql`
        SELECT * FROM products
        WHERE id = ${id}
        `
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        const updatedProduct = await sql`
        UPDATE products
        SET name = ${name || product[0].name}, image = ${image || product[0].image}, description = ${description || product[0].description}, price = ${price || product[0].price}
        WHERE id = ${id}
        RETURNING *
        `

        if (updatedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: updatedProduct[0],
            message: "Product updated successfully"
        })

    } catch (error) {
        console.log("Error in updating Product controller : ", error)
        next(error);
    }

}

// delete product
export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedProduct = await sql`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
        `
        if (deletedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            data: deletedProduct[0],
            message: "Product deleted successfully"
        })
    }

    catch (error) {
        console.log("Error in deleting Product controller : ", error)
        next(error);

    }

}