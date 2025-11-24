import joi from 'joi'

//Register Validation
export const reg_val = joi.object(
    {
        name : joi.string().required(),
        age : joi.number().integer().min(18).required(),
        email : joi.string().email().required(),
        pass : joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!<>@#$%*?]).{8,}$")).required().messages({
            "string.pattern.base" : "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
            "string.empty": "Password cannot be empty",
            "any.required": "Password is required"
        }),
        conf_pass : joi.ref('pass')
    }
)

//Login Validation
export const login_val = joi.object(
    {
        email : joi.string().email().required(),
        pass : joi.string().required()
    }
)