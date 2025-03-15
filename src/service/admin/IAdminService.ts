import {IUser} from '../../interface/userInterface'


export interface IAdminService{
  findByEmail(email:string):Promise<IUser>
  comparePassword(password:string,newPassword:string):Promise<boolean>
  getAllUser():Promise<IUser[] | null>
}