import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';
import { UserInfor } from 'src/users/userInfor.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';

import { TableService } from 'src/table/table.service';
import { RowEntity } from 'src/table/row.entity';
import { ColumnEntity } from 'src/table/column.entity';
import { Board } from 'src/board/entity/board.entity';
import { Workspace } from 'src/workspace/entity/workspace.entity';
import { BoardService } from 'src/board/board.service';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { RowDetail } from 'src/table/rowDetails.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User,UserInfor]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn},
  }),UsersModule,MailerModule,ConfigModule ],
  controllers: [AuthController],
  providers: [AuthService,UsersService,MailerService]
})
export class AuthModule {}
