import jwt from 'jsonwebtoken' 
 
export const jwt_verify_access = (req, res, next) => {

    try{
        const auth = req.headers['authorization']

        const access_token = auth.split(' ')[1]
        
        const valid = jwt.verify(access_token, process.env.JWT_ACCESS_SECRET_KEY)

        req.key = valid.key

        console.log(req.key)

        next()
    }
    catch(error)
    {
        return res.json({success : false, message : error})
    }
}

export const jwt_verify_refresh = (req, res, next) => {

    try{
        const auth = req.headers['authorization']

        const token = auth.split(' ')[1]

        const valid = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)

        req.key = valid.key

        next()
    }
    catch(error)
    {
        return res.json({success : false, message : "Invalid Token!"})
    }
}
 