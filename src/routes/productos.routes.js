import { Router } from "express";
import {
  createNewProducto,
  renderProductos,
  updateProducto,
  deleteProducto,
} from "../controllers/productos.controller.js";
import { isAuthenticated, isAdmin } from "../middelwares/auth.js";

const router = Router();

// Get All productos
router.get("/productos", renderProductos);

// Create producto
// router.post("/productos/new-producto", isAuthenticated,isAdmin, createNewProducto);
router.post("/productos/new-producto", createNewProducto);

// Edit productos
// router.put("/productos/edit-producto/:id", isAuthenticated,isAdmin, updateProducto);
router.put("/productos/edit-producto/:id", updateProducto);

// Delete productos
// router.delete("/productos/delete/:id", isAuthenticated,isAdmin, deleteProducto);
router.delete("/productos/delete/:id", deleteProducto);

export default router;
