import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entity/workspace.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { UserInfor } from 'src/users/userInfor.entity';
import { Board } from 'src/board/entity/board.entity';
import { BoardService } from 'src/board/board.service';

import { TableService } from 'src/table/table.service';
import { ColumnEntity } from 'src/table/column.entity';
import { RowEntity } from 'src/table/row.entity';
import { RowDetail } from 'src/table/rowDetails.entity';
import { TableController } from 'src/table/table.controller';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Workspace,User,UserInfor])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService,UsersService]
})
export class WorkspaceModule {}
