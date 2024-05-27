import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entity/workspace.entity';
import { Repository } from 'typeorm';
import { WorkspaceDto } from './dto/workspace.dto';
import { UsersService } from 'src/users/users.service';
import { TableService } from 'src/table/table.service';
import { BoardService } from 'src/board/board.service';

@Injectable()
export class WorkspaceService {
    constructor(
        
            @InjectRepository(Workspace)
            private workspaceRepository: Repository<Workspace>,
            private userService:UsersService,
            
          
    ){}

    async createWorkspace(workspace:WorkspaceDto):Promise<Workspace>{
        const user= await this.userService.findUserById(workspace.userId)
        if(!user){
            throw new NotFoundException("user does not find");
        }
        const newWorkspace= new Workspace()
        newWorkspace.workspacename=workspace.workspacename;
        newWorkspace.users=[user]
        newWorkspace.workspaceDetail=workspace.workspaceDetail;
        return await this.workspaceRepository.save(newWorkspace)
    }
    async findWorkspaceById(workspaceId:number):Promise<Workspace>{
        return await this.workspaceRepository.findOne({
            where:{workspaceId : workspaceId},
            relations:{
                users:{
                    userInfors:true
                },
                
                boards:{
                    cols:{
                        rows:true
                    }
                }
            }
        })
    }

    async addUserInWorkspace(workspaceId:number, userId:number):Promise<any>{
const user= await this.userService.findUserById(userId);
if(!user){
    throw new NotFoundException("user does not find");
}
const workspaceFind= await this.findWorkspaceById(workspaceId)
if(!workspaceFind){
    throw new NotFoundException("workspace does not find");

}

workspaceFind.users.push(user)
return await this.workspaceRepository.save(workspaceFind)

    }


 
}

