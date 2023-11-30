// Using Mongo DB schema
import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcryptjs' // Hashing
import jwt from 'jsonwebtoken' //jwt utilization


const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, //Making the email unique
    validate: validator.isEmail
  },
  password : {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password length should be minimum of 8 characters'],
  },
  location: {
    type: String,
    default: 'India'
  }
},
{
  timestamps: true
})

//Creating middleware for hashing
//Before saving into db do the following
userSchema.pre('save',async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt) //encrypted
})

//Compare Password
userSchema.methods.comparePassword = async function(userPassword){
  const isMatch = await bcrypt.compare(userPassword,this.password)
  return isMatch
}

//JSON web token
userSchema.methods.createJWT = function(){
  // Generate token based on _id
  return jwt.sign({
    userId: this._id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1d'
  })
}

// Export the user model
export default mongoose.model('User',userSchema)