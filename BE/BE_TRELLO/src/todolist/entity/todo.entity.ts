
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { TodoList } from "./todoList.entity";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    todoId: number
    @Column()
    todoTitle: string;
    @ManyToOne(()=>TodoList, (todolist)=> todolist.todos,{onDelete:'CASCADE'})
    @JoinColumn({name:"todoListId"})
    todolist:TodoList
    @Column({default:false})
    isChecked:Boolean


}