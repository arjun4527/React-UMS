import {IUser} from '../../interface/userInterface'
import {IAdminService} from '../../service/admin/IAdminService'
import { CreateJwt } from '../../utils/jwt';
import { StatusCode } from '../../utils/statusCode';
import {Request, Response} from'express'


export class AdminController{
 private adminService:IAdminService;
 private createJwt:CreateJwt

 constructor(AdminService:IAdminService){
  this.adminService=AdminService
  this.createJwt=new CreateJwt()
 }

 public async login(req:Request,res:Response){
  try {
    const {email,password}=req.body

    if(!email || !password){
      return res.status(StatusCode.UNAUTHORIZED).json({success:false,message:"Email  and Password is required"})
    }

    const admin=await this.adminService.findByEmail(email)
    if(!admin){
      return res.status(StatusCode.UNAUTHORIZED).json({success:false,message:"User not found"})

    }

    const isMatch=await this.adminService.comparePassword(password,admin.password)
    if(!isMatch){
       return res.status(StatusCode.UNAUTHORIZED).json({success:false,message:"Password not match "})
    }

    const {refreshToken,accessToken}=await this.createJwt.createToken(admin._id?.toString()||"",admin.role)

      console.log('re',refreshToken,'acccess',accessToken);
      
      res.cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
        maxAge: 15 * 60 * 1000,
      });

       
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      

      res.status(StatusCode.OK).json({success:true,message:"Admin logged In",admin:admin})
  } catch (error:any) {
    console.log(error.message);
     res.status(StatusCode.INTERNAL_SERVER_ERROR).json({success:false,message:error.message || "an error occured in controller"});
      
  }
 }


 public async getAllUser(req:Request,res:Response){
  try {
    let allUserData=await this.adminService.getAllUser()

    if(allUserData){
      return res.status(StatusCode.OK).json({success:true,userData:allUserData})

    }
  } catch (error:any) {
    console.log(error.message);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({success:false,message:error.message || "an error occured in controller"});

  }
 }
}