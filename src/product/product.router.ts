import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as ProductService from "./product.service";

export const productRouter = express.Router();

// GET: List all the books
productRouter.get("/", async (request: Request, response: Response) => {
  try {
    const products = await ProductService.listProducts();
    return response.status(200).json(products);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: A book based on the id
// productRouter.get("/:id", async (request: Request, response: Response) => {
//   const id: number = parseInt(request.params.id, 10);

//   try {
//     const book = await ProductService.getBook(id);
//     if (book) {
//       return response.status(200).json(book);
//     }
//   } catch (error: any) {
//     return response.status(500).json(error.message);
//   }
// });

productRouter.post(
  "/",
  body("title").isString(),
  body("price").isInt(),
  body("image").isString(),
  body("stock").isInt(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const product = request.body;
      const newProduct = await ProductService.createProduct(product);
      return response.status(201).json(newProduct);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: Update book
productRouter.put(
  "/:id",
  body("title").isString(),
  body("price").isInt(),
  body("image").isString(),
  body("stock").isInt(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);
    
    try {
      const product = request.body;
      // Update the product
      const updatedProduct = await ProductService.updateProduct(product, id);

      // Return the updated product
      return response.status(200).json(updatedProduct);
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }
);