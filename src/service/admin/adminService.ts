import { IAdminService } from "./IAdminService";
import { IUser } from "../../interface/userInterface";
import { IAdminRepository } from "../../repository/admin/IAdminRepsitory";
import { Bcrypt } from "../../utils/bcrypt";

export class AdminService implements IAdminService{
  private adminRepository:IAdminRepository
  private bcrypt:Bcrypt

  constructor(AdminRepository:IAdminRepository){
    this.adminRepository = AdminRepository
    this.bcrypt = new Bcrypt()
    
  }


  async findByEmail(email: string): Promise<IUser> {
      if(!email){
        throw new Error("Email is Required")
      }

      const isAdmin=await this.adminRepository.findAdminByEmail(email)
      if(!isAdmin){
         throw new Error("Admin not found")
       }
       return isAdmin
  }     


  async comparePassword(password: string, newPassword: string): Promise<boolean> {
    return await this.bcrypt.comparePassword(password,newPassword)
 }

 async getAllUser(): Promise<IUser[] | null> {
     return await this.adminRepository.getAllUserData()
 }
}