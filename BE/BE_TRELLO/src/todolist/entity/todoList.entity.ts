import { ColumnEntity } from "src/table/column.entity";
import { RowEntity } from "src/table/row.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class TodoList {
    @PrimaryGeneratedColumn()
    todoListId: number
    @Column()
    todoListTitle: string;
    @ManyToOne(()=>RowEntity, (row)=> row.todoLists,{onDelete:'CASCADE'})
    @JoinColumn({name:"rowId"})
    row:RowEntity
    @OneToMany(()=>Todo, (todo)=>todo.todolist,{onDelete:'CASCADE'})
    todos:Todo[]


}