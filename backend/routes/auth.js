import express from "express"
import {registeruser,loginuser,logout} from "../controllers/auth.js"
const router=express.Router()
router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/logout",logout)
export default router