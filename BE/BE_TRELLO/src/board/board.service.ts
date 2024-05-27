import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { Repository } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { WorkspaceService } from 'src/workspace/workspace.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BoardService {
    constructor(
    @InjectRepository(Board)
    private boardRepository:Repository<Board>,
    private workspaceService:WorkspaceService

    ){}

    async createBoard(board:BoardDto):Promise<Board>{
        
        const workspace= await this.workspaceService.findWorkspaceById(board.workspaceId)
        if(!workspace){
            throw new NotFoundException("workspace does not find");
        }
        const newBoard= new Board()
        newBoard.boardname= board.boardname
        newBoard.workspace=workspace
        newBoard.boardbackground= board.boardbackground
       
        return await this.boardRepository.save(newBoard)
    }
    async findBoardById(boardId:number):Promise<Board>{
        return await this.boardRepository.findOne({
            where:{boardId:boardId},
            relations:{
                workspace:{
                    users:true
                }
                ,cols:{
                    rows:{
                        cols:true,
                        
                    }
                }
            }
        })
    }

}
