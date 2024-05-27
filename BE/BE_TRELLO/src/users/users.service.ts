import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersDto } from './dto/users.dto';
import { asyncScheduler } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/auth/decorate/auth.guard';
import { UserInfor } from './userInfor.entity';
import { privateDecrypt } from 'crypto';
import { UsersInfotDto } from './dto/userInfor.dto';

import { CommentDto } from 'src/comment/dto/comment.dto';
import { TableService } from 'src/table/table.service';
import { WorkspaceService } from 'src/workspace/workspace.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserInfor)
        private userInforRepository: Repository<UserInfor>,
        
    ) {
    }
    findAll(): Promise<User[]> {
        return this.usersRepository.find({

            relations: {

                workspaces: {
                    boards: {

                        cols:{
                            rows:true
                        }
                    }

                }
            }

        });
    }
    async createUser(user: UsersDto): Promise<User> {
        
        const { email, password} = user
        const userCreate= await this.usersRepository.save({email,password});
        
        return userCreate;
    }
    async findUserById(userId: number): Promise<User> {
        return await this.usersRepository.findOne({
            where: { userId: userId },
            relations:
            {
                userInfors:true,
                
                workspaces: {
                    boards: {

                        cols:{
                            rows:true
                        }
                    }

                }
            }
        })
    }
    async updateUser(userId:number, password:string):Promise<any>{
        const user= await this.findUserById(userId)
        if(!user){
            throw new NotFoundException("user does not find");
        }
        user.password = password
        return await this.usersRepository.save(user)
    }

    
    async findUserByName(email:string): Promise<User> {
       const user= await this.usersRepository.findOne({
           where:{ email: email}
        })
        console.log(user)
        return user;
    }

    async findAllUserInfor():Promise<UserInfor[]>{

        return await this.userInforRepository.find({

            relations:{
                users:true
            }
        }
            
               
        );
    }
    async createUserInfor(userInfo:UsersInfotDto):Promise<UserInfor>{
        const user= await this.findUserById(userInfo.userId)
        const newUserInfor = new UserInfor();
        newUserInfor.display_name=userInfo.display_name;
        newUserInfor.age= userInfo.age;
        newUserInfor.sex=userInfo.sex;
        newUserInfor.address=userInfo.address;
        newUserInfor.users=user;
        return await this.userInforRepository.save(newUserInfor)
        
    }

    async findUserInforById(userId:number):Promise<UserInfor>{

        return await this.userInforRepository.findOne({
                where:{users:{userId:userId},
        }  
            })
    }
    async updateImage(userId:number, avatarImg:string):Promise<UserInfor>{
        const userInfo=await this.findUserInforById(userId);
        if(!userInfo){
            throw new NotFoundException("userInfo does not find");
        }
        userInfo.avatarImg=avatarImg
        return await this.userInforRepository.save(userInfo)

    }

    async updateUserInfo(userId:number, userInfo:UsersInfotDto):Promise<UserInfor>{

        const userInfoFind=await this.findUserInforById(userId);
        if(!userInfoFind){
            throw new NotFoundException("user does not find")
        }
        userInfoFind.display_name=userInfo.display_name;
        userInfoFind.age=userInfo.age;
        userInfoFind.sex=userInfo.sex;
        userInfoFind.address=userInfo.address
        userInfoFind.avatarImg=userInfo.avatarImg
       await this.userInforRepository.save(userInfoFind)
        return await this.findUserInforById(userId)
    }

    async updateUserActive(userId:number):Promise<User>{
        const user= await this.findUserById(userId);
        if(!user){
            throw new NotFoundException("user does not find");
        }
        // await this.usersRepository.update(userId, { isActive: true });

    user.isActive = true; // Cập nhật trạng thái isActive trong đối tượng user

    return await this.usersRepository.save(user)

    }

    
}


