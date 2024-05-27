import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserInfor } from './userInfor.entity';

import { TableService } from 'src/table/table.service';
import { RowEntity } from 'src/table/row.entity';
import { ColumnEntity } from 'src/table/column.entity';
import { RowDetail } from 'src/table/rowDetails.entity';
import { Board } from 'src/board/entity/board.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { BoardService } from 'src/board/board.service';
import { WorkspaceService } from 'src/workspace/workspace.service';




@Module({
  imports: [TypeOrmModule.forFeature([User,UserInfor])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
