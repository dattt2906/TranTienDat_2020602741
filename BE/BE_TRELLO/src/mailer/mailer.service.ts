import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {
    constructor (private readonly configService:ConfigService){

    }
    mailTransport(){
      const transporter = nodemailer.createTransport({
        host: this.configService.get<string>("MAIL_HOST"),
        port: this.configService.get<number>("MAIL_PORT"),
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user:this.configService.get<string>("MAIL_USER"),
          pass: this.configService.get<string>("MAIL_PASSWORD"),
        },
      });
      return transporter
    }
  
    async sendEmailLogin(token:string, email:string):Promise<any>{
        
        const transport= this.mailTransport();
        const cofirmLink=`http://localhost:3001/auth/confirm/${token}`;
        const options:Mail.Options={
          from:{name:'Your App', address:"default@gmail.com" } ,
            to:email,
            subject:"verify-trello",
            html:`<a href="${cofirmLink}"><button style="background-color: #4CAF50")">click here to login trello</button> </a><p>Cherr!</p>`
        }
        try{
          const result=await transport.sendMail(options);
          return result;
        } catch(error){
          console.log('Error:', error)
        }
        
    }
    async sendEmailForgotPass(token:string, email:string):Promise<any>{
      const transport= this.mailTransport();
      const forgotPassLink=`http://localhost:3000/Retype-password/?${token}`;
      const options:Mail.Options={
        from:{name:'Your App', address:"default@gmail.com" } ,
          to:email,
          subject:"Forgot-password",
          html:`<a href="${forgotPassLink}"><button style="background-color: #4CAF50")">click here to setup your new password</button> </a><p>Cherr!</p>`
      }
      try{
        const result=await transport.sendMail(options);
        return result;
      } catch(error){
        console.log('Error:', error)
      }
      

    }
    async sendEmailInvite(userId:number, email:string, workspaceId:number):Promise<any>{

      const transport= this.mailTransport();
      const inviteLink=`http://localhost:3000/WorkspaceArea/?userId=${userId}&workspaceId=${workspaceId}`;
      const options:Mail.Options={
        from:{name:'Your App', address:"default@gmail.com" } ,
          to:email,
          subject:"Invite member to workspace",
          html:`<a href="${inviteLink}"><button style="background-color: #4CAF50")">click here to join workspace</button> </a><p>Cherr!</p>`
      }
      try{
        const result=await transport.sendMail(options);
        return result;
      } catch(error){
        console.log('Error:', error)
      }
      
    }



}
