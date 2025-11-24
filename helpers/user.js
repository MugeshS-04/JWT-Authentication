import { UserMap } from "./UserData.js"

export const getDetailsHelper = (req, res) => {
     
    if(UserMap.has(req.key))
    {
        return res.json({ name : UserMap.get(req.key).name, age : UserMap.get(req.key).age, email : UserMap.get(req.key).email })
    }
    else
    {
        return res.json({success : false, message : error})
    }
}