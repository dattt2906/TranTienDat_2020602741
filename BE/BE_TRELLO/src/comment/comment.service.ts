import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { UsersService } from 'src/users/users.service';
import { TableService } from 'src/table/table.service';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
    constructor(
    @InjectRepository(Comment)
        private commentRepository:Repository<Comment>,
        private userService:UsersService,
        private tableService:TableService


    ){}

     async createComment( comment:CommentDto):Promise<Comment>{
        const user= await this.userService.findUserById(comment.userId)
        if(!user){
            throw new NotFoundException("user does not find");
        }
        const rowFind= await this.tableService.findRowById(comment.rowId)
        if(!rowFind){
            throw new NotFoundException("row does not find");
        }
        const newComment= new Comment();
        newComment.contentComment=comment.contentComment
        newComment.user=user
        newComment.row=rowFind
       
        return await this.commentRepository.save(newComment)
    }


}
