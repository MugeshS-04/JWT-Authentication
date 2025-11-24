import { register_helper, login_helper, refresh_helper } from '../helpers/auth.js'

export const register = async (req, res) => {

    return register_helper(req, res)
}

export const login = async (req, res) => {

    return login_helper(req, res)
}

export const refresh = (req, res) => {
    
    return refresh_helper(req, res)
}