import {IUser} from '../../interface/userInterface'

export interface IAdminRepository{
  findAdminByEmail(email:string):Promise<IUser|null>
  getAllUserData():Promise<IUser[]|null>
}