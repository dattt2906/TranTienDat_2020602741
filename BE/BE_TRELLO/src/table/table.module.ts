import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { RowEntity } from './row.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/decorate/auth.guard';
import { UserInfor } from 'src/users/userInfor.entity';
import { Board } from 'src/board/entity/board.entity';
import { BoardService } from 'src/board/board.service';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { RowDetail } from './rowDetails.entity';



@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, RowEntity,RowDetail,Board,Workspace,User,UserInfor])],
  controllers: [TableController],
  providers: [TableService,BoardService,WorkspaceService,UsersService]
})
export class TableModule { }
