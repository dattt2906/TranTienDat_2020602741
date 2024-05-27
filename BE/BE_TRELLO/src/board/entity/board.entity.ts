import { ColumnEntity } from "src/table/column.entity";
import { Workspace } from "src/workspace/entity/workspace.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    boardId: number
    @Column()
    boardname: string;
    @Column({default:null})
    boardbackground:string
    @OneToMany(()=>ColumnEntity,(col)=> col.board)
    cols:ColumnEntity[]
    @ManyToOne(()=>Workspace,(workspace)=>workspace.boards )
    @JoinColumn({name:"workspaceId"})
    workspace:Workspace
}
