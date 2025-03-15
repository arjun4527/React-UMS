import {IUser} from '../../interface/userInterface'
import { IUserService } from './IUserService'
import { IUserRepository } from '../../repository/user/IUserRepository'
import {Bcrypt} from '../../utils/bcrypt'
import {Schema, Types } from 'mongoose'
import mongoose from "mongoose"; // ✅ Ensure a single import
import { StatusCode } from '../../utils/statusCode'


export class UserService implements IUserService{
  private userRepository:IUserRepository
  private bcrypt:Bcrypt
  constructor(UserRepository:IUserRepository){
    this.userRepository=UserRepository
    this.bcrypt=new Bcrypt()
  }


  async createUser(user:IUser): Promise<IUser>{

    console.log('service',user);
    

    if(!user.email) throw new Error("Email is required")

    if(!user.password) throw new Error("Password is required")

    if(!user.name) throw new Error("Name is required")
    
    const isUserExist=await this.userRepository.findUserByEmail(user.email)
    if(isUserExist){
      throw new Error ("Email already used")
    }

    const hashedPassword=await this.bcrypt.hashPassword(user.password)

    const newUser=await this.userRepository.createUser({
      ...user,
      password:hashedPassword
    })
    return newUser
  }


  async findByEmail(email: string): Promise<IUser | null> {
      if(!email){
        throw new Error("email is missing")
      }

      const isUser=await this.userRepository.findUserByEmail(email)
      if(!isUser){
        throw new Error("user not found")
      }
      return isUser
  }



  async comparePassword(password: string, newPassword: string): Promise<boolean> {
     return await this.bcrypt.comparePassword(password,newPassword)
  }


  async updateUser(userId: Schema.Types.ObjectId, userData: Partial<IUser>): Promise<IUser | null> {
    console.log("userDataaaaaaaaa",userData)
      if(!userId){
        throw new Error("UserId is missing")

      }

      if(!userData){
        throw new Error("UserData is missing")
      }

      const updatedUser=await this.userRepository.updateUserById(userId,userData)

      if(!updatedUser){
        throw new Error("user not found !!")
        
      }
      return updatedUser
  }

}

