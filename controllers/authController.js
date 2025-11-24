import { reg_val, login_val } from "../routes/validation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const UserMap = new Map()

export const register = async (req, res) => {

    let valid = reg_val.validate(req.body)

    if(valid.error)
    {
        return res.json({success : false, message : valid.error.message})
    }
    else
    {
        let hashpass = await bcrypt.hash(req.body.pass, 10)
        
        let obj = {
            name : req.body.name,
            age : req.body.age,
            email : req.body.email,
            pass : hashpass
        }

        UserMap.set(obj.email, obj)

        return res.json({success : true, message : "Account created Successfully!"})
    }
}

export const login = async (req, res) => {

    const valid = login_val.validate(req.body)

    if(valid.error)
    {
        return res.json({success : false, message : valid.error.message})
    }
    else
    {
        if(UserMap.has(req.body.email))
        {
            const pass_cmpr = await bcrypt.compare(req.body.pass, UserMap.get(req.body.email).pass)

            if(pass_cmpr)
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
}

export const refresh = (req, res) => {
    
    try{
        const header = req.headers['authorization']

        const refresh_token = header.split(' ')[1]

        if(!refresh_token)
        {
            return res.json({success : false, message : "No refresh token, Login again!"})
        }

        const valid = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET_KEY)

        const access_token = jwt.sign({key : valid.key}, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn : '1d'})
        
        return res.json({success : true, message : "Token Generated", access_token : access_token})
    }
    catch(error)
    {
        return res.json({success : false, message : error})
    }
    
}