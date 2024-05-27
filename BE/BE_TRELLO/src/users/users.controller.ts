import { BadGatewayException, BadRequestException, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Body } from '@nestjs/common';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from 'src/auth/decorate/auth.guard';
import { UserInfor } from './userInfor.entity';
import { UsersInfotDto } from './dto/userInfor.dto';
import { CommentDto } from 'src/comment/dto/comment.dto';


@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService
  ) { }
  @Get('find-all-user')
  async getAllUser(): Promise<User[]> {
    return await this.userService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get("find-user-by-id/:userId")
  async getUserById(@Param("userId") userId: number): Promise<User> {
    return await this.userService.findUserById(userId);
  }
  // @Put("update-user-password/:userId")
  // async updateUser(@Param("userId") userId:number, @Body("password") password:string):Promise<any>{

  //   return await this.userService.updateUser(userId, password)
  // }

  @Put('update-user-active/:userId')
  async updateUserActive(@Param('userId') userId:number):Promise<User>{
    return await this.userService.updateUserActive(userId)
  }

  @Get('find-user-by-name/:username')
  async findUserByName(@Param('username') username:string):Promise<User>{
    const user= await this.userService.findUserByName(username);
    if(!user){
      console.log("user khong ton tai")
    }
    console.log(user);
    return user;


  }
  @Get('find-all-userinfor')
  async findUserInfor():Promise<UserInfor[]>{

    return await this.userService.findAllUserInfor();
  }
  @Post('create-userinfor')
  async createUserInfor(@Body() userInfor:UsersInfotDto):Promise<UserInfor>{
    return await this.userService.createUserInfor(userInfor);
  }

  @Get('find-userinfo-by-userId/:userId')
  async findUserInforById(@Param('userId') userId:number):Promise<UserInfor>{
  return await this.userService.findUserInforById(userId)
    }
  @Put("update-userinfo/:userId")
  async updateUserInfo(@Param("userId") userId:number, @Body() userinfo:UsersInfotDto):Promise<UserInfor>{
    return await this.userService.updateUserInfo(userId, userinfo)
  }

  @Put("update-avatar/:userId")
  async updateImage(@Param("userId") userId:number, @Body("avatarImg") avatarImg:string):Promise<UserInfor>{
      return await this.userService.updateImage(userId,avatarImg)
  }  

 
//  @Post("create-comment")
//   async createComment( @Body() comment:CommentDto):Promise<Comment>{
//     return await this.userService.createComment( comment)
//   }
  
  
  
  
}
  


