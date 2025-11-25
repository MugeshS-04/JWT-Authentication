import { UserMap } from "./UserData.js"

export const getDetailsHelper = (req, res) => {

    const key = req.key
     
    if(UserMap.has(key))
    {
        return res.json({ name : UserMap.get(key).name, age : UserMap.get(key).age, email : UserMap.get(key).email })
    }
    else
    {
        return res.json({success : false, message : "No Details Available!"})
    }
}

export const setDetailsHelper = (req, res) => {

    const user_obj = req.body
     
    if(UserMap.has(user_obj.email))
    {
        const map = UserMap.get(user_obj.email)

        if(user_obj.name) map.name = user_obj.name
        if(user_obj.age) map.age = user_obj.age 

        UserMap.set(user_obj.email, map)

        return res.json({ success : true, message : "Changes Saved Successfully!"})
    }
    else
    {
        return res.json({success : false, message : "Given Email doesn't exist!"})
    }
}