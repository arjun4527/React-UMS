import express ,{Application,Request,Response} from "express"
import {Document,Types} from 'mongoose'
import cors from "cors"
import {UserRepository} from './repository/user/userRepository'
import {AdminRepository} from './repository/admin/adminRepository'

import {UserService} from './service/user/userService'
import {AdminService} from './service/admin/adminService'

import {UserController} from './controller/user/userController'
import {AdminController} from './controller/admin/adminController'

import {UserRoute} from './route/userRoute'
import {AdminRoute} from './route/adminRoute'

import { JwtPayload } from "jsonwebtoken"
import cookieParser from "cookie-parser"


declare module"express-serve-static-core"{
  interface Request{
    user:JwtPayload
  }
}

const corsOption = {
  origin: "http://localhost:5173", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};


export class App{
  public app:Application;
  constructor(){
    this.app=express();
    this.setMiddleware();
    this.setUserRoutes();
    this.setAdminRoutes()
  }

  private setMiddleware(){
    this.app.use(cors(corsOption))
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: true }))
  }


  private setUserRoutes(){
    const userRepo=new UserRepository()
    const userService=new UserService(userRepo)
    const userController=new UserController(userService)
    const  userRoute=new UserRoute(userController)
    userRoute.setRoutes()
    this.app.use("/user",userRoute.getRouter())
  }


  private setAdminRoutes(){
    const adminRepo=new AdminRepository()
    const adminService=new AdminService(adminRepo)
    const adminController=new AdminController(adminService)
    const  adminRoute=new AdminRoute(adminController)
    adminRoute.setRoutes()
    this.app.use("/admin",adminRoute.getRouter())
  }


  public getApp(){
    return this.app
  }
}


