import { Router } from "express";
import {successLogin, failLogin, singup, signin, uploadImg, perfil, logout} from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../middelwares/auth.js";
import upload from "../helpers/procArchivo.js";

const router = Router();

// Routes
router.post("/auth/signup", singup);

router.post("/auth/signin", signin);

router.post("/auth/successLogin", successLogin);

router.post("/auth/failLogin", failLogin);

router.get("/auth/perfil", isAuthenticated, perfil);

router.post("/auth/upload", isAuthenticated,  upload.single('myFile'), uploadImg);

router.get("/auth/logout", isAuthenticated, logout);

export default router;
