import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceDto } from './dto/workspace.dto';
import { Workspace } from './entity/workspace.entity';
import { AddUserDto } from './dto/addUserInWorkspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}


  @Post("create-workspace")
  async createWorkspace(@Body()workspace:WorkspaceDto):Promise<Workspace>{
    return await this.workspaceService.createWorkspace(workspace)
  }
  @Get("find-workspace-by-id/:workspaceId")
  async findWorkspaceById(@Param("workspaceId") workspaceId:number):Promise<Workspace>{
    return await this.workspaceService.findWorkspaceById(workspaceId)
  }
  @Post("add-user-in-workspace")
  async addUserInWorkspace(@Body() addUser:AddUserDto):Promise<any>{
    return await this.workspaceService.addUserInWorkspace(addUser.workspaceId, addUser.userId)
  }

}
