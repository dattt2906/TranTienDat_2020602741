import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ColumnEntity } from './column.entity';
import { ColumnDto } from './dto/column.dto';
import { RowEntity } from './row.entity';
import { RowDto } from './dto/row.dto';
import { UsersService } from 'src/users/users.service';
import { BoardService } from 'src/board/board.service';
import { RowdetailDto } from './dto/rowDetails.dto';
import { RowDetail } from './rowDetails.entity';

@Injectable()
export class TableService {

    constructor(
        @InjectRepository(ColumnEntity)
        private colRepository: Repository<ColumnEntity>,

        @InjectRepository(RowEntity)
        private rowRepository: Repository<RowEntity>,
        private boardService: BoardService,

        @InjectRepository(RowDetail)
        private rowDetailRepository:Repository<RowDetail>,
    ) { }
    async findAllColumn(): Promise<ColumnEntity[]> {
        return await this.colRepository.find({
            relations: { rows: true }
        })

    }
    async createColumn(col: ColumnDto): Promise<ColumnEntity> {
        const board = await this.boardService.findBoardById(col.boardId)
        const newColumn = new ColumnEntity();
        newColumn.columnName = col.columnName;
        newColumn.board = board
        newColumn.sort=col.sort
        return await this.colRepository.save(newColumn);
        
    }
    
    async findColumnById(colId: number): Promise<ColumnEntity> {
        return await this.colRepository.findOne({

            where: { columnId: colId },
            relations: {
                rows: { 
                    cols:true,
                    rowDetail:true,
                    comments:{
                        user:{
                            userInfors:true

                        }
                    }
                },
                
                
            }
        });
    }
    async findAllRow(): Promise<RowEntity[]> {
        return await this.rowRepository.find();
    }
    async createRow(row: RowDto): Promise<RowEntity> {
        const col = await this.findColumnById(row.columnId);
        const newRow = new RowEntity();
        newRow.content = row.content;
        newRow.cols = col;
        newRow.sort=row.sort
        const Row = await this.rowRepository.save(newRow)
        const rowDetail= {contentName:row.content,rowId:Row.rowId}
        await this.createRowDetail(rowDetail)

        return Row
    }
    async findRowById(rowId: number): Promise<RowEntity> {
        return await this.rowRepository.findOne({

            where: { rowId: rowId },
            relations:{
                cols:true,
                rowDetail:true,

                comments:{
                    user:{
                        userInfors:true
                    }
                },
                todoLists:{
                    todos:true
                }
            }

        });
    }

    async DelColumnById(columnId: number): Promise<void> {
        const columnDel = await this.findColumnById(columnId);
        if (columnDel.rows) {
            await this.rowRepository.remove(columnDel.rows)
        }
        await this.colRepository.remove(columnDel);
        console.log(columnDel)
    }
    async DelRowById(rowId: number): Promise<void> {
        const rowDel = await this.findRowById(rowId);
        await this.rowRepository.remove(rowDel);
    }

    async UpdateColumnById(id:number, col:ColumnDto):Promise<ColumnEntity>{
        let column= await this.findColumnById(id);
        if(!column){
            throw new NotFoundException("Column does not find");
        }
       column ={...column, ...col };
       return this.colRepository.save(column)
       
    }
    async UpdateCardById(id:number, row:RowDto):Promise<RowEntity>{
        let rowChange= await this.findRowById(id);
        if(!rowChange){

            throw new NotFoundException("Column does not find");
        }
        rowChange ={...rowChange,...row};
        return this.rowRepository.save(rowChange);
    }
    
    async UpdateColumn(columns:ColumnDto[]):Promise<any>{
        const promises = columns.map(column => {
            let columnId = column.columnId;
            return this.UpdateColumnById(columnId, column);
        });
    
        await Promise.all(promises);
    
        return "updated-column";
    }
    async UpdateRow(rows:RowDto[]):Promise<any>{
        const promises = rows.map(row => {
            let rowId = row.rowId;
            return this.UpdateCardById(rowId,row);
        });
    
        await Promise.all(promises);
    
        return "updated-row";
    }

    async createRowDetail(rowDetail:RowdetailDto):Promise<RowDetail>{
        const row = await this.findRowById(rowDetail.rowId)
        const newRowDetail= new RowDetail();
        newRowDetail.content=row.content,
        newRowDetail.description=rowDetail.description,
        newRowDetail.attachment=rowDetail.attachment,
        newRowDetail.activity= rowDetail.activity,
        newRowDetail.deadline=rowDetail.deadline
        newRowDetail.row=row;
        return await this.rowDetailRepository.save(newRowDetail)
    }
    async findRowDetailById(rowId:number):Promise<RowDetail>{

        return await this.rowDetailRepository.findOne({
                where:{row:{rowId:rowId}},
                relations:{
                    row:{
                        cols:true
                    }
                }  
            })
    }
    async updateRowDetail(rowId:number, rowDetail:RowdetailDto):Promise<RowDetail>{
        const rowDetailFind= await this.findRowDetailById(rowId);
        if(!rowDetailFind){

            throw new NotFoundException("rowdetail does not find")
        }
        rowDetailFind.description=rowDetail.description;
        rowDetailFind.attachment= rowDetail.attachment;
        rowDetailFind.activity=rowDetail.activity
        rowDetailFind.deadline=rowDetail.deadline
        await this.rowDetailRepository.save(rowDetailFind)
        return await this.findRowDetailById(rowId)
    }

    async updateDeadline(rowId:number, deadline:string):Promise<RowDetail>{
          
        const rowDetailFind= await this.findRowDetailById(rowId);
        if(!rowDetailFind){

            throw new NotFoundException("rowdetail does not find")
        }
        rowDetailFind.deadline=deadline;
        await this.rowDetailRepository.save(rowDetailFind)
        return await this.findRowDetailById(rowId)

    }

}
