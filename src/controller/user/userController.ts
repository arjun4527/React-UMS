import {Request, Response} from'express'
import {IUser} from '../../interface/userInterface'
import { IUserService } from '../../service/user/IUserService'
import { StatusCode } from '../../utils/statusCode';
import { log } from 'console';
import {CreateJwt} from '../../utils/jwt'


export class UserController{
  private userService:IUserService;
  private createJwt:CreateJwt
  constructor(UserService:IUserService){
    this.userService=UserService
    this.createJwt=new CreateJwt()
  }

  public async signUp(req:Request,res:Response){
    try {
      const user:IUser=req.body
      const newUser=await this.userService.createUser(user)

      if(!newUser)return res.status(StatusCode.BAD_REQUEST).json({success:false,message:"No User"})

       return res.status(StatusCode.OK).json({success:true,message:"SignUp Successfully Completed"}) 
    } catch (error:any) {
      console.log(error)
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
      
    }
  }


  public async login(req:Request,res:Response){
    try {
      const {email,password}=req.body

      if(!email || !password){
        return res.status(StatusCode.UNAUTHORIZED).json({success:false,message:"Email  and Password is required"})
      }

      const user=await this.userService.findByEmail(email)
      if(!user){
        return res.status(StatusCode.UNAUTHORIZED).json({success:false,message:"User not found"})
      }

      const isMatch=await this.userService.comparePassword(password,user.password)
      if(!isMatch){
        return res.status(StatusCode.UNAUTHORIZED).json({success:false,message:"Password not match "})
      }

      const {refreshToken,accessToken}=await this.createJwt.createToken(user._id?.toString()||"",user.role)

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
      

      res.status(StatusCode.OK).json({success:true,message:"Login Successful",user:user})
    } catch (error:any) {
      console.log(error.message);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({success:false,message:error.message || "an error occured in controller"});
      
      
    }
  }


  public async editUser(req:Request,res:Response){
    try {
      

      const userData=req.body

      const userId=req.user.userId
      console.log('control UserData',userData);
      
      const updateUser=await this.userService.updateUser(userId,userData)
      
    
      if(updateUser){
        res.status(StatusCode.OK).json({success:true,message:"Profile updated successfully",userData:updateUser})
      }
      
    } catch (error:any) {
      console.log(error);
      res.status(StatusCode.BAD_REQUEST).json({message : error.message});
    }
  }


  public async newAccessToken(req:Request,res:Response){
    try {
      
      
      const refreshToken =req.cookies.refreshToken

      console.log('refresh',refreshToken);


      //crreateing access token
      const newAccessToken=await this.createJwt.refreshAccess(refreshToken)

      console.log("got new access token :)",newAccessToken)

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", 
        maxAge: 15 * 60 * 1000,
      });
      res.status(StatusCode.OK).json({success:true,accessToken:newAccessToken})
      
    } catch (error:any) {
      console.log(error);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({success : false , message : error.message})

    }
  }



  public async logout(req:Request,res:Response){
    res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });
    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: "Logged out successfully" });
  }
}