import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserMap } from './UserData.js'

export const register_helper = async (req, res) => {

    let hashpass = await bcrypt.hash(req.body.pass, 10)
    
    let obj = {
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        pass : hashpass
    }

    UserMap.set(obj.email, obj)

    return res.json({success : true, message : "Account Registered Successfully!"})
}

export const login_helper = async (req, res) => {

    if(UserMap.has(req.body.email))
    {
        const password_compare = await bcrypt.compare(req.body.pass, UserMap.get(req.body.email).pass)

        if(password_compare)
        {
            let access_token = jwt.sign({key : req.body.email}, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn : '10m'})
            let refresh_token = jwt.sign({key : req.body.email}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn : '30d'})
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
 
 