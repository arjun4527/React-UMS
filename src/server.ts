import {App} from './app'
import { ConnectMongo} from './config/connectMongodb'

const app=new App()
const database=new ConnectMongo()

database.connect()

app.getApp().listen(8000,()=>{console.log("Server is Running");
})