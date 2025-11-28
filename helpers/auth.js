import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pool from './UserData.js'

export const register_helper = async (req, res) => {

    const { name, age, email, pass } = req.body
    
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    console.log(result.rows[0])

    if(result.rows[0]) 
    {
        res.json({success : false, message : "Email already exist!"})
    }
    else
    {
        let hashpass = await bcrypt.hash(pass, 10)

        const db_obj = [ name, age, email, hashpass]
        
        pool.query("INSERT INTO USERS (name, age, email, password) VALUES ($1, $2, $3, $4)", db_obj)
        
        console.log("Data inserted successfully!")

        return res.json({success : true, message : "Account Registered Successfully!"})
    }

}

export const login_helper = async (req, res) => {

    const { email, pass } = req.body

    const result = await pool.query("SELECT * FROM USERS WHERE email = $1", [email])

    if(result.rows[0])
    {
        const hashpass = result.rows[0].password
        const password_compare = await bcrypt.compare(pass, hashpass)

        if(password_compare)
        {
            let access_token = jwt.sign({key : email}, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn : '10m'})
            let refresh_token = jwt.sign({key : email}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn : '30d'})
            return res.json({success : true, message : "Login Successful!", access_token : access_token, refresh_token : refresh_token})
        }
        else
        {
            return res.json({success : false, message : "Password is Incorrect"})
        }
    }
    else
    {
        return res.json({success : false, message : "No Data Available"})
    }
}

export const refresh_helper = (req, res) => {

    try{
        
        const access_token = jwt.sign({key : req.key}, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn : '1d'})
    
        return res.json({success : true, message : "Token Generated", access_token : access_token})
    }
    catch(error)
    {
        return res.json({success : false, message : "Error Occured during signing jwt!"})
    }
}
 
 