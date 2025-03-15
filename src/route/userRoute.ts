import {UserController} from '../controller/user/userController'
import { Request,Response,Router } from 'express'
import  {UserAuth}  from '../middleware/tokenVerify'


export class UserRoute{
  private userController :UserController;
  private router:Router;
  private userAuth : UserAuth;

  constructor(userController:UserController){
    this.userController=userController;
    this.router=Router();
    this.userAuth = new UserAuth();
  } 


    public setRoutes(){
      this.router.post('/signUp',async(req:Request,res:Response)=>{
        await this.userController.signUp(req,res)
      })

      this.router.post('/login',async(req:Request,res:Response)=>{
        await this.userController.login(req,res)
      })

      this.router.post('/editUser', this.userAuth.verifyAccessToken, async (req: Request, res: Response) => {
        await this.userController.editUser(req, res);
      });
      
      this.router.post('/refreshToken',async(req:Request,res:Response)=>{
        await this.userController.newAccessToken(req,res)
      })

      
      this.router.post('/logout',async(req:Request,res:Response)=>{
        await this.userController.logout(req,res)
      })
    }


    public getRouter():Router{
      return this.router
    }
  
}