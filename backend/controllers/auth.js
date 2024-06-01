import db from "../connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const registeruser=(req,res)=>{
    const q="INSERT INTO users(`name`,`username`,`email`,`password`) values(?)"
    const salt=10;
     bcrypt.hash(req.body.password,salt,(err,hash)=>{
        if(err)
            return res.json(err).status(403)
        const values=[req.body.name,req.body.username,req.body.email,hash]
        db.query(q,[values],(err,data)=>{
            if(err)
                res.json(err).status(500)
            res.json(data).status(201)
        })
    })
}
export const loginuser=(req,res)=>{
    const q="SELECT * FROM users where username=?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err)
            return res.json(err).status(403)
        if(data.length<=0)
            return res.json("username not registered").status(401)
        bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
            if(err)
                return res.json(err).status(400)
            if(!response)
                res.json("Incorrect password").status(401)
            const token=jwt.sign(data[0].id,process.env.JWT_SECRET)
            res.cookie("token",token)
            const{password,...others}=data[0]
            return res.json(others).status(200)
           
        })
    })
}
export const logout=(req,res)=>{
    res.clearCookie("token")
return res.json("user logged out").status(200)
}