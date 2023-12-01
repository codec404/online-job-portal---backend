import userModel from "../models/userModel.js";

export const getUserController = async (req, res, next) => {
  //Destructuring
  const user = await userModel.findOne({ _id: req.user.userId });
  res.status(200).send({
    name: user.name,
    email: user.email,
    location: user.location
  })
};
