import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entity/todoList.entity';
import { Todo } from './entity/todo.entity';
import { TableService } from 'src/table/table.service';
import { BoardService } from 'src/board/board.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { Board } from 'src/board/entity/board.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { ColumnEntity } from 'src/table/column.entity';
import { RowEntity } from 'src/table/row.entity';
import { RowDetail } from 'src/table/rowDetails.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { UserInfor } from 'src/users/userInfor.entity';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entity/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TodoList,Todo,Board,Workspace,ColumnEntity,RowEntity,RowDetail,User,UserInfor,Comment])],
  controllers: [TodolistController],
  providers: [TodolistService, TableService,BoardService,WorkspaceService,UsersService,CommentService],
})
export class TodolistModule {}
