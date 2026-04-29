import { Router } from "express";
import { getAllUser, login, registerUser } from "../controller/user.controller.js";

const router = Router()

router.get("/",getAllUser)
router.post("/register",registerUser)
router.post("/login",login)
export default router