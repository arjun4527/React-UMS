import {IUser} from '../../interface/userInterface'
import { IAdminRepository } from './IAdminRepsitory'
import userModel from '../../models/userModel'

export class AdminRepository implements IAdminRepository{
 async findAdminByEmail(email: string): Promise<IUser | null> {
     return await userModel.findOne({email:email})
 }

 async getAllUserData(): Promise<IUser[] | null> {
     return await userModel.find()
 }
}