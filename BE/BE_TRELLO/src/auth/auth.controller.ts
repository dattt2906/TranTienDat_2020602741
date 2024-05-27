import { Controller,Body,Post, Get, ValidationPipe, Param, Redirect, Put} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountDto } from './dto/account.dto';
import { Public } from './decorate/auth.guard';
import { Matches } from 'class-validator';
import { InviteMemberDto } from './dto/inviteMember.dto';
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,24}$/;

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // @Public()
    @Post('login')
    async signIn(@Body() account:AccountDto ) {
        return this.authService.signIn(account.email, account.password);
      }
    @Post('regis')
    async regis(@Body(ValidationPipe) account:AccountDto){
      return this.authService.Register(account.email,account.password);
      
    }
    @Post('decodeToken')
    async decodeToken(@Body('token') token:string):Promise<any>{
      return this.authService.decodeToken(token)
    }
    @Get('confirm/:token')
    @Redirect("http://localhost:3000")
    async confirm(@Param("token") token:string):Promise<any>{

      return this.authService.confirm(token)
    }
    @Post('forget-pass')
    async forgetPass(@Body('email') email:string):Promise<any>{
      return await this.authService.forgetPass(email)
    }
    @Put("update-user-password/:userId")
    async updateUser(@Param("userId") userId:number, @Body('password') password:string):Promise<any> {
  
      return await this.authService.updateUser(userId, password)
    }
    @Post("invite-member")
    async inviteMember(@Body() inviteMember:InviteMemberDto):Promise<any>{

      return await this.authService.inviteMember(inviteMember.email, inviteMember.workspaceId)
    }

   


}
