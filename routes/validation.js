import joi from 'joi'

//Register Validation
export const register_validate = (req, res, next) => {

    const register_valid_obj = joi.object({
        name : joi.string().required(),
        age : joi.number().integer().min(18).required(),
        email : joi.string().email().required(),
        pass : joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!<>@#$%*?]).{8,}$")).required().messages({
            "string.pattern.base" : "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
            "string.empty" : "Password cannot be empty",
            "any.required" : "Password is required"
        }),
        conf_pass : joi.string().valid(joi.ref('pass')).messages({
            "any.only" : "Confirm password doesn't match with the password!"
        })
    })

    const isvalid = register_valid_obj.validate(req.body)

    if(isvalid.error)
    {
        res.json({success : false, message : isvalid.error.message})
    }
    else
    {   
        next()
    }
}

//Login Validation
export const login_validate = (req, res, next) => {
    const login_valid_obj = joi.object(
    {
        email : joi.string().email().required(),
        pass : joi.string().required()
    })

    const obj = req.body

    const isvalid = login_valid_obj.validate(obj)

    if(isvalid.error) {

        return res.json({success : false, message : isvalid.error.message})
    }
    else
    {
        next()
    }
}




