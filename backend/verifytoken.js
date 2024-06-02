import jwt from "jsonwebtoken"
 const verifyuser=(req,res,next)=>{
    const token =req.cookies.token
    if(!token)
        return res.json("user not logged").status(401);
    jwt.verify(token,process.env.JWT_SECRET,(err,userid)=>{
        if(err)
            return res.json(err).status(400)
        req.currentuserid=userid
        next()
    })
}
export const verifyandauthorised=(req,res,next)=>{
    verifyuser(req,res,()=>{
        if(req.currentuserid===req.params.id){
            next()
        }
        else
        return res.json("not authorised").status(401)
        }
    )
}
