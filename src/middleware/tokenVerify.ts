import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction,Request,Response } from 'express'
import { StatusCode } from '../utils/statusCode'

// interface AuthRequest extends Request {
//   user?: JwtPayload; // Adding `user` property
// }



 export class UserAuth{
  public verifyAccessToken=async (req:Request,res:Response,next:NextFunction) : Promise<void>=>{
    try {
      const accessToken=req.cookies?.accessToken
  
      if(!accessToken){
         res.status(StatusCode.UNAUTHORIZED).json({message:'Unauthorized :No token provided'})
         return
      }
  
      const decoded=jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET as string) as JwtPayload
      
      if(!decoded){
  
        throw new Error("error in decoding")
      }
      req.user=decoded
      next()
    } catch (error:any) {
       res.status(StatusCode.FORBIDDEN).json({message:"Access token expired"})
       return
    }
  }
 }


