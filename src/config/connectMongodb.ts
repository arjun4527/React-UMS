import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export class ConnectMongo{
  private dataBaseUrl:string
  constructor(){
    if(!process.env.DATABASE_CONFIG){
      throw new Error ("connection string not found")

    }
    this.dataBaseUrl=process.env.DATABASE_CONFIG
  }

  connect(){
   mongoose
   .connect(this.dataBaseUrl)
   .then(()=>console.log("DataBase Connected Successfully"))
   .catch((error)=>console.log(error))
  }
}