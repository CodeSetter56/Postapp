// use req.user to access current user

import userModel from "../models/user.js"

export const getme = async(req,res)=>{
    //_id -> id from cookieGen during token creation 
    const userId = req.user.id
    const user = await userModel.findById(userId)
    const removePassUser = user.toObject();
    delete removePassUser.password;
    res.json(removePassUser);
}