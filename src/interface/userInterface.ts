import {Types} from 'mongoose'

export interface IUser{
  _id?:Types.ObjectId;
  name:string;
  email:string;
  password:string;
  phone?:string;
  gender?:string
  address?:string
  pincode?:string
  
  role:'user'|'admin'
  isAdmin:boolean;
  imageUrl?:string;
}