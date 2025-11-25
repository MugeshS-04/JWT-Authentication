import { getDetailsHelper, setDetailsHelper } from '../helpers/user.js'

export const getDetails = (req, res) => {

    return getDetailsHelper(req, res)    
}

export const setDetails = (req, res) => {

    return setDetailsHelper(req, res)    
}