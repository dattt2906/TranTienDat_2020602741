import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';
import { Board } from './entity/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post("create-board")
  async createBoard(@Body() board:BoardDto):Promise<Board>{
    return await this.boardService.createBoard(board)
  }
  @Get("find-board-by-id/:boardId")
  async findBoardById(@Param("boardId") boardId:number):Promise<Board>{
    return await this.boardService.findBoardById(boardId)
  }
  
}
