import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.MYSQL_PASSWORD,
    database:"ecommerce_restapi"
})
export default db