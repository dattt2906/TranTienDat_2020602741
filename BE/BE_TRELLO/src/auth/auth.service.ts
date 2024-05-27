import { Injectable, Redirect, UnauthorizedException, flatten } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { from } from 'rxjs';
import { SendEmailDto } from 'src/mailer/mail.interface';
import { jwtConstants } from 'src/constants/jwt.constant';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private mailerService: MailerService,
        private jwtService: JwtService) {
    }

    async setIsActive(userId: number) {
        await this.usersService.updateUserActive(userId)

    }

    async signIn(email: string, password: string): Promise<{ access_token: string, id: number,Active:boolean|any }> {
        const user = await this.usersService.findUserByName(email);
        if (user?.password !== password) {
            throw new UnauthorizedException("The account or password information is not exactly");
        }
        else{

            if(user.isActive===false){
                throw new UnauthorizedException("Confirm in email before signing");
            }

            const payload = { sub: user.userId, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            id: user.userId,
            Active:user.isActive
            

        };
        }

    }
    async Register(email: string, password: string): Promise<{ regis_token: string, id: number }> {

        const user = await this.usersService.findUserByName(email);
        if (user) {

            throw new UnauthorizedException("The account has someone use");
        }
        const userNew = await this.usersService.createUser({ email, password })
        const user1 ={display_name:userNew.email, userId:userNew.userId}
        await this.usersService.createUserInfor(user1)
        const payload = { sub: userNew.userId, email: userNew.email };
        const regis_token = await this.jwtService.signAsync(payload);
        const id = userNew.userId
        await this.mailerService.sendEmailLogin(regis_token,userNew.email)
        return {
            regis_token,
            id

        };


    }

    async inviteMember(email:string, workspaceId:number):Promise<any>{

        const user = await this.usersService.findUserByName(email);
        if (!user) {

            throw new UnauthorizedException("The account is not register");
        }

        const payload ={sub:user.userId, workspaceId:workspaceId};
        // const invite_token= await this.jwtService.signAsync(payload);
        await this.mailerService.sendEmailInvite(user.userId, email, workspaceId)
        


    }

    async confirm(token: string): Promise<any> {

        const jwt = require('jsonwebtoken');
        const tokenString = token; // Thay thế bằng token bạn muốn giải mã
        let decodeToken
        // Giải mã token
        await jwt.verify(token, jwtConstants.secret, (err, decoded) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error('Failed to decode token:', err);
            } else {
                // Thành công, trả về dữ liệu được giải mã
                console.log('Decoded payload:', decoded);
                decodeToken = [decoded]
            }
        });
        if (decodeToken) {
            const userId = decodeToken[0].sub
            // this.usersService.updateUserActive(decodeToken.sub)
            this.usersService.updateUserActive(userId)
           
        }

    }

    async forgetPass(email:string):Promise<any>{
     
        const user = await this.usersService.findUserByName(email);
        if (!user) {
            throw new UnauthorizedException("The email is not registed");
        }
        const payload = { sub: user.userId, email: user.email };
        const forgetPass_token = await this.jwtService.signAsync(payload);
        await this.mailerService.sendEmailForgotPass(forgetPass_token, user.email)
        return {
            forgetPass_token
        };
    }



    async decodeToken(token:string):Promise<any>{

        const jwt = require('jsonwebtoken');
        const tokenString = token; // Thay thế bằng token bạn muốn giải mã
        let decodeToken
      
        // Giải mã token
        await jwt.verify(token, jwtConstants.secret, (err, decoded) => {
            if (err) {
                // Xử lý lỗi nếu có
                console.error('Failed to decode token:', err);
            } else {
                // Thành công, trả về dữ liệu được giải mã
                console.log('Decoded payload:', decoded);
                decodeToken=decoded
            }
        });
        return decodeToken
       
       
    }
    checkPassword(password:string):boolean{
        const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,24}$/;
            return passwordRegex.test(password);
          };

    
    async updateUser(userId:number, password:string):Promise<any>{
        
        if(this.checkPassword(password)){
        return await this.usersService.updateUser(userId,password)
        }
        
        
        throw new UnauthorizedException("The password must have at least 6 letters including number and length");

    }
    
}
