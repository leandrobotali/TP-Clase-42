import { Router } from "express";
import {renderMsjForm, crearMsj} from "../controllers/mensajes.controllers.js";
import { isAuthenticated } from "../middelwares/auth.js";

const router = Router();

// Routes
router.get("/mensajes", isAuthenticated, renderMsjForm);

router.post("/mensaje", isAuthenticated, crearMsj);

export default router;
