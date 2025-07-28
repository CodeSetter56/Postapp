// use req.user to access current user

export const getme = async(req,res)=>{
    const user = req.user
    res.json(user)
}