import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { ColumnEntity } from "./column.entity";
import { RowDetail } from "./rowDetails.entity";
import { Comment } from "src/comment/entity/comment.entity";
import { TodoList } from "src/todolist/entity/todoList.entity";


@Entity()
export class RowEntity {
    @PrimaryGeneratedColumn()
    rowId: number;
    @Column()
    content: string;
    @Column({default:null})
    sort:number;

    @CreateDateColumn()
    createdAt!: Date;
    @ManyToOne(() => ColumnEntity, (col) => col.rows)
    @JoinColumn({ name: 'columnId' })
    cols: ColumnEntity;
    @OneToOne(()=>RowDetail, (rowDetail)=> rowDetail.row)
    rowDetail:RowDetail

    @OneToMany(()=>Comment, (comment)=>comment.row ,{onDelete:'CASCADE'})
    comments:Comment[]

    @OneToMany(()=>TodoList, (todolist)=> todolist.row,{onDelete:'CASCADE'})
    todoLists:TodoList[]

    

}

