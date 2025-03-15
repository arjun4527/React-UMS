import {IUser} from '../../interface/userInterface'
import {Schema,Types} from 'mongoose'

export interface IUserService{
  createUser(user:IUser):Promise<IUser>
  findByEmail(email:string):Promise<IUser|null>
  comparePassword(password:string,newPassword:string):Promise<boolean>
//   findUser(userId:string):Promise<IUser|null>
  updateUser(userId:Schema.Types.ObjectId,userData:Partial<IUser>):Promise<IUser|null>
}