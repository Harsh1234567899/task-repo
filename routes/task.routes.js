import { Router } from "express";
import{allTask,createTask,updateTask,userAllTak} from "../controller/task.controller.js"
import { verifyJWT } from "../middlewear/user.middleware.js";
const router = Router()

router.get("/",allTask)
router.post("/create",verifyJWT, createTask)
router.get("/user-all",verifyJWT,userAllTak)
router.put("/:id",updateTask)
export default router