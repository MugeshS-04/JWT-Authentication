import { UserMap } from "./UserData.js"

export const getDetailsHelper = (req, res) => {

    const { key } = req.key
     
    if(UserMap.has(key))
    {
        return res.json({ name : UserMap.get(key).name, age : UserMap.get(key).age, email : UserMap.get(key).email })
    }
    else
    {
        return res.json({success : false, message : error})
    }
}