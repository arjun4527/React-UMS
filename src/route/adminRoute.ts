import { AdminController } from "../controller/admin/adminController";
import { Request,Response,Router } from "express";

export class AdminRoute{
  private adminController:AdminController;
  private router:Router;
  // private userAuth:

  constructor(adminController:AdminController){
    this.adminController=adminController;
    this.router=Router()
  }

  public setRoutes(){
     this.router.post('/login',async(req:Request,res:Response)=>{
        await this.adminController.login(req,res)
      })

      this.router.get('/getAllUser',async(req:Request,res:Response)=>{
        await this.adminController.getAllUser(req,res)
      })
  }


  public getRouter():Router{
    return this.router
  }
}