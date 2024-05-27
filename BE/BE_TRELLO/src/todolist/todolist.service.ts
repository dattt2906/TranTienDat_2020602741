import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoList } from './entity/todoList.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableService } from 'src/table/table.service';
import { TodoListDto } from './dto/todoList.dto';
import { Todo } from './entity/todo.entity';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodolistService {
    constructor(
        @InjectRepository(TodoList)
        private todoListRepository: Repository<TodoList>,

        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        private tableService:TableService
       
        
    ) {
    }

    async createTodoList(todoList:TodoListDto):Promise<TodoList>{
        const rowFind= await this.tableService.findRowById(todoList.rowId)
        if(!rowFind){
            throw new NotFoundException("row does not find");
        }
        const newTodoList= new TodoList()
        newTodoList.todoListTitle= todoList.todoListTitle
        newTodoList.row=rowFind
        return await this.todoListRepository.save(newTodoList)
    }
    async findTodoListById(todoListId:number):Promise<TodoList>{

        return await this.todoListRepository.findOne({

            where :{todoListId:todoListId},
            relations:{
                todos:true
            }
        }
           
            
        )

    }
    async findTodoById(todoId:number):Promise<Todo>{

        return await this.todoRepository.findOne({

            where :{todoId:todoId},
            relations:{
                todolist:true
            }
        }
           
            
        )

    }
    async createTodo(todo:TodoDto):Promise<Todo>{
        const todoList= await this.findTodoListById(todo.todoListId)

        if(!todoList){
            throw new NotFoundException("todoList does not find");
        }
        const newTodo= new Todo()
        newTodo.todoTitle=todo.todoTitle
        newTodo.todolist= todoList
        return await this.todoRepository.save(newTodo)

    }

    async delTodoListById(todoListId:number):Promise<void>{

        const todoListDel= await this.findTodoListById(todoListId);
        await this.todoListRepository.remove(todoListDel)
    }

    async delTodoById(todoId:number):Promise<void>{

        const todoDel= await this.findTodoById(todoId);
        await this.todoRepository.remove(todoDel)
    }

    async updateIsChecked(todoId:number, isChecked:boolean):Promise<Todo>{

        const todoFind= await this.findTodoById(todoId)
        if(!todoFind){

            throw new NotFoundException("todo does not find");
        }

        todoFind.isChecked=isChecked
      return await this.todoRepository.save(todoFind)
        



    }


    


}
