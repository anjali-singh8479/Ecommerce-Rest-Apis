import express from "express"
import {updateuser,deleteuser,getallusers,getstats} from "../controllers/user.js"
import { verifyandauthorised,verifytokenandadmin } from "../verifytoken.js"
const router=express.Router()
router.put("/:id",verifyandauthorised,updateuser)
router.delete("/:id",verifyandauthorised,deleteuser)
router.get("/allusers",verifytokenandadmin,getallusers)
router.get("/stats",verifytokenandadmin,getstats)
export default router