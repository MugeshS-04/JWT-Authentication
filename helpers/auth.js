import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserMap } from './UserData.js'

export const register_helper = async (req, res) => {

    const { name, age, email, pass } = req.body

    let hashpass = await bcrypt.hash(pass, 10)
    
    let obj = {
        name : name,
        age : age,
        email : email,
        pass : hashpass
    }

    UserMap.set(email, obj)

    return res.json({success : true, message : "Account Registered Successfully!"})
}

export const login_helper = async (req, res) => {

    const { email, pass } = req.body

    if(UserMap.has(email))
    {
        const password_compare = await bcrypt.compare(pass, UserMap.get(email).pass)

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
 
 