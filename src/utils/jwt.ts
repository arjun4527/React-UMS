import jwt from 'jsonwebtoken'
import {Response} from 'express'
import {jwtPayload} from '.././interface/jwtPayloadInterface'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config()


export class CreateJwt{
  public createToken=async(userId:string,role:string)=>{

    const accessSecretKey=process.env.JWT_ACCESS_SECRET as string
    const refreshSecretKey=process.env.JWT_REFRESH_SECRET as string
  
    console.log("Access Secret Key:", process.env.JWT_ACCESS_SECRET);
    console.log("Access Expiry:", process.env.JWT_ACCESS_EXPIRY);
    


    if(!accessSecretKey || !refreshSecretKey){
      throw new Error ('Secret are missing')
    }

    const accessToken=jwt.sign({userId:userId,role:role},accessSecretKey,{expiresIn:"15m"})

    const refreshToken=jwt.sign({userId:userId,role:role},refreshSecretKey,{expiresIn:'7d'})
    
    return {
      accessToken,
      refreshToken
    }
  }

  public  refreshAccess=async(refreshToken:string)=>{
    try{
      if(!refreshToken){
        console.log('no refresh token');
        throw new Error("Refresh token is required to create access token")
      }
      
    const accessSecretKey=process.env.JWT_ACCESS_SECRET as string
    const refreshSecretKey=process.env.JWT_REFRESH_SECRET as string
    
    
    if(!accessSecretKey || !refreshSecretKey){
      throw new Error ('Secret are missing')
    }
    
    const veriftAsync=(token:string,secret:string)=>{
      return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(err,decoded)=>{
          if(err)return reject(err);
          resolve(decoded)
        })
      })
    }

    const verifyData=await veriftAsync(refreshToken,refreshSecretKey)as jwtPayload
    console.log('verified',verifyData);

    const accessToken=jwt.sign({userId:verifyData.userId},accessSecretKey,{expiresIn:"15m"})
    return accessToken
    }catch(error:any){
      console.log(error.message);

    }
  }
}