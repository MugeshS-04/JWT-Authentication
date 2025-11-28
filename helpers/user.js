import pool from "./UserData.js"

export const getDetailsHelper = async (req, res) => {

    const key = req.key

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [key])
     
    if(result.rows[0])
    {
        return res.json({ name : result.rows[0].name, age : result.rows[0].age, email : result.rows[0].email })
    }
    else
    {
        return res.json({success : false, message : "No Details Available!"})
    }
}

export const setDetailsHelper = async (req, res) => {

    const user_obj = req.body

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [user_obj.email])
     
    if(result.rows[0])
    {
        if(user_obj.name)
        {
            const result = await pool.query("UPDATE users SET name = $1", [user_obj.name])
        }
        if(user_obj.age)
        {
            const result = await pool.query("UPDATE users SET age = $1", [user_obj.age])
        }
        
        return res.json({ success : true, message : "Changes Saved Successfully!"})
    }
    else
    {
        return res.json({success : false, message : "Given Email doesn't exist!"})
    }
}