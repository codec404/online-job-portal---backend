import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    next("name is required"); // syntax: next(err)
  }
  if (!email) {
    res.status(400).send({
      message: "Please Provide email",
      success: false,
    });
  }
  if (!password) {
    res.status(400).send({
      message: "Please Provide password",
      success: false,
    });
  }

  //existing user
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(200).send({
      success: false,
      message: "Already registered",
    });
  }
  const user = await userModel.create({ name, email, password });
  const token = user.createJWT()
  res.status(201).send({
    success: true,
    message: "Created user successfully",
    user:{
      name: user.name,
      email: user.email,
      location: user.location,

    },
    token,
  });
};


export const loginController = async (req,res,next)=>{
  const {name,password,email} = req.body
  //validation
  if(!email || !password){
    next('Provide all fields')
  }
  //find user by email
  const user = await userModel.findOne({email});
  if(!user){
    next('Invalid username or password')
  }

  //Compare Password
  const isMatch = await user.comparePassword(password)
  // console.log(isMatch);
  if(!isMatch){
    next('Wrong Password')
  }

  const token = user.createJWT()
  res.status(201).send({
    success: true,
    message: "Logged in successfully",
    user:{
      name: user.name,
      email: user.email,
      location: user.location,
      // password: user.password
    },
    token,
  })
};