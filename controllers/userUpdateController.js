import userModel from "../models/userModel.js"

export const userUpdateController = async (req,res,next) => {
    const {name,email,location} = req.body
    if(!location || !email || !name){
        next('Please provide all fields')
    }
    const user = await userModel.findOne({_id: req.user.userId})
    user.name = name
    user.email = email
    user.location = location

    await user.save()
    const token = user.createJWT()
    res.status(200).send({
        user,
        token
    })
}

//GET USER CONTROLLER
export const getUserDataController = async (req,res) => {
    try {
        const user = await userModel.findById({_id: req.body.user.userId})
        console.log(user)
        user.password = undefined
        if(!user){
            return res.status(200).send({
                success: false,
                message: "User not found",
            })
        }
        else{
            res.status(200).send({
                success: true,
                data: user,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Auth Error",
            error: error.message
        })
    }
}