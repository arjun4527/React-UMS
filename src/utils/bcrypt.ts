import bcrypt from 'bcrypt'

export class Bcrypt{
  public async hashPassword(password:string):Promise<string>{
    const hashedPassword=await bcrypt.hash(password,10)
    return hashedPassword
  }
   
  public async comparePassword(password:string,newPassword:string):Promise<boolean>{
    return await bcrypt.compare(password,newPassword)
  }
}