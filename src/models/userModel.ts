import mongoose from 'mongoose'
import {IUser} from '../interface/userInterface'

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    // required:true,
  },
  email:{
    type:String,
    // required:true,
  },
  password:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
  },
  gender:{
    type:String,
  },
  pincode:{
    type:String,
  },
  address:{
    type:String,
  },
  imageUrl:{
    type:String
  },
   role:{
    type:String,
    enum:['user','admin'],
    default:'user'
   },
  
  isAdmin:{
    type:Boolean,
    default:false,
  },
  profileImage:{
    type:String,
  },
  
},{timestamps:true})

const userModel=mongoose.model<IUser>('User',userSchema)
export default userModel