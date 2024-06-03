import jwt from "jsonwebtoken"
import db from "./connect.js"
 const verifyuser=(req,res,next)=>{
    const token =req.cookies.token
    if(!token)
        return res.json("user not logged").status(401);
    jwt.verify(token,process.env.JWT_SECRET,(err,userinfo)=>{
        if(err)
            return res.json(err).status(400)
        req.currentuserid=userinfo
        next()
    })
}
export const verifyandauthorised=(req,res,next)=>{
    verifyuser(req,res,()=>{
        if(req.currentuserid.id===req.params.id){
            next()
        }
        else
        return res.json("not authorised").status(401)
        }
    )
}
export const verifytokenandadmin=(req,res,next)=>{
    verifyuser(req,res,()=>{
        if(req.currentuserid.isadmin===1){
            next()
        }
        else
        return res.json("not authorised")
    })
}