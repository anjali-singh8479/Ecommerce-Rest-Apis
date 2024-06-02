import express from "express"
import {updateuser,deleteuser} from "../controllers/user.js"
import { verifyandauthorised } from "../verifytoken.js"
const router=express.Router()
router.put("/:id",verifyandauthorised,updateuser)
router.delete("/:id",verifyandauthorised,deleteuser)
export default router