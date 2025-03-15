import {IUser} from '../../interface/userInterface'
import { IUserRepository } from './IUserRepository'
import userModel from '../../models/userModel'
import {ObjectId, Types} from 'mongoose'


export class UserRepository implements IUserRepository{
  async createUser(user: IUser): Promise<IUser> {
      return await userModel.create(user)
  }

  async findUserById(userId: string): Promise<IUser | null> {
      return await userModel.findById(userId)
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
      return await userModel.findOne({email:email})
  }

  async updateUserById(userId: ObjectId, user: Partial<IUser>): Promise<IUser | null> {
      return await userModel.findByIdAndUpdate(userId,user,{new:true})
  }


}