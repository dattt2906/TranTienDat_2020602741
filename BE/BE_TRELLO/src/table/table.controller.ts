import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TableService } from './table.service';
import { ColumnEntity } from './column.entity';
import { ColumnDto } from './dto/column.dto';
import { RowEntity } from './row.entity';
import { RowDto } from './dto/row.dto';
import { Public } from 'src/auth/decorate/auth.guard';
import { RowDetail } from './rowDetails.entity';
import { RowdetailDto } from './dto/rowDetails.dto';
import { promises } from 'dns';

@Controller('table')
export class TableController {

    constructor(
        private tableService: TableService

    ) { }
    // @Public()
    @Get("find-all-column")
    async findAllColumn(): Promise<ColumnEntity[]> {
        return await this.tableService.findAllColumn();
    }

    @Post("create-column")
    async createColumn(@Body() col: ColumnDto): Promise<ColumnEntity> {
        console.log(col)
        return await this.tableService.createColumn(col);
        

    }
    @Get("find-column-by-id/:columnId")
    async getUserById(@Param("columnId") columnId: number): Promise<ColumnEntity> {
        return await this.tableService.findColumnById(columnId);
    }
    @Get("find-row-by-id/:rowId")
    async findRowById(@Param("rowId") rowId: number): Promise<RowEntity> {
        return await this.tableService.findRowById(rowId);
    }
    @Get("find-all-row")
    async findAllRow(): Promise<RowEntity[]> {
        return await this.tableService.findAllRow();
    }
    @Post("create-row")
    async createRow(@Body() row: RowDto): Promise<RowEntity> {
        return await this.tableService.createRow(row);
    }

    @Delete("del-column/:columnId")
    async DeleteColumnById(@Param("columnId") columnId: number): Promise<void> {
        return await this.tableService.DelColumnById(columnId);
    }


    @Delete("del-row/:rowId")
    async DeleteRowById(@Param("rowId") rowId: number): Promise<void> {
        return await this.tableService.DelRowById(rowId);
    }
    @Put("update-column-by-id/:columnId")
    async UpdateColumnNameById(@Param("columnId") id:number, @Body() col:ColumnDto):Promise<ColumnEntity>{
        return await this.tableService.UpdateColumnById(id, col)
    }
    @Put("update-card-by-id/:cardId")
    async UpdateRowContentById(@Param("cardId") id:number, @Body() row:RowDto):Promise<RowEntity>{
        return await this.tableService.UpdateCardById(id, row)
    }

    @Put("update-column")
    async UpdateColumn(@Body() body :ColumnDto[] ):Promise<any>{

        return await this.tableService.UpdateColumn(body);
    }
    @Put("update-row")
    async UpdateRow(@Body() body: RowDto[]):Promise<any>{
        return await this.tableService.UpdateRow(body);
    }

    @Get('find-rowDetail-by-rowId/:rowId')
    async findUserInforById(@Param('rowId') rowId:number):Promise<RowDetail>{
    return await this.tableService.findRowDetailById(rowId)
      }

  @Put("update-rowDetail/:rowId")
  async updateUserInfo(@Param("rowId") rowId:number, @Body() rowDetail:RowdetailDto):Promise<RowDetail>{
    return await this.tableService.updateRowDetail(rowId, rowDetail)
  }

  @Put("update-deadline-by-rowId/:rowId")
  async updateDeadline(@Param("rowId") rowId:number, @Body('deadline') deadline:string):Promise<RowDetail>{
    return await this.tableService.updateDeadline(rowId,deadline)
  }

    




}
