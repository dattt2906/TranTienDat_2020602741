import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UsersService } from 'src/users/users.service';
import { TableService } from 'src/table/table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserInfor } from 'src/users/userInfor.entity';
import { Comment } from './entity/comment.entity';
import { BoardService } from 'src/board/board.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { Board } from 'src/board/entity/board.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { ColumnEntity } from 'src/table/column.entity';
import { RowEntity } from 'src/table/row.entity';
import { RowDetail } from 'src/table/rowDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserInfor,Comment,Board,Workspace,ColumnEntity,RowEntity,RowDetail])
],
  controllers: [CommentController],
  providers: [CommentService,UsersService,TableService,BoardService,WorkspaceService],
})
export class CommentModule {}
