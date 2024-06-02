import db from "../connect.js";
import bcrypt from "bcrypt"
export const updateuser = (req, res) => {
    if(req.body.password){
         const q =
        "UPDATE users SET `name`=? ,`username`=? ,`password`=? ,`email`=? WHERE id=?";
     const salt=10;
     bcrypt.hash(req.body.password,salt,(err,hash)=>{
        if(err)
            return res.json(err).status(400)
       const values = [
            req.body.name,
            req.body.username,
            hash,  
            req.body.email,
          ];
          db.query(q, [...values, req.params.id], (err, data) => {
            if (err) return res.json(err).status(400);
            res.clearCookie("token")
            res.json({message: "user updated" }).status(200);
          }); 
     })
     
    }
    else{
        const q =
        "UPDATE users SET `name`=? ,`username`=? ,`email`=? WHERE id=?";
     const values = [
        req.body.name,
        req.body.username,
        req.body.email,
      ];
      db.query(q, [...values, req.params.id], (err, data) => {
        if (err) return res.json(err).status(400);
        res.json({ message: "user updated"}).status(200);
      }); 
    }
   
};
export const deleteuser=(req,res)=>{
    const q="DELETE FROM users where id=?"
    db.query(q,[req.params.id],(err,data)=>{
        if(err)
            return res.json(err).status(400)
        res.clearCookie("token")
        return res.json({...data,"message":"user deleted"}).status(200)
    })
}
