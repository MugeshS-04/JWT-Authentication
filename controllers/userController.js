import jwt from 'jsonwebtoken'
import { UserMap } from '../Data/UserData.js'

export const getDetails = (req, res) => {

    try{
        const auth = req.headers['authorization']

        const token = auth.split(' ')[1]

        const valid = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)

        if(UserMap.has(valid.key))
        {
            return res.json({ name : UserMap.get(valid.key).name, age : UserMap.get(valid.key).age, email : UserMap.get(valid.key).email })
        }
    }
    catch(error)
    {
        return res.json({success : false, message : error})
    }
    
}