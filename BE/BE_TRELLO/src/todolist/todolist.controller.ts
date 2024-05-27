import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodoListDto } from './dto/todoList.dto';
import { TodoList } from './entity/todoList.entity';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './entity/todo.entity';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}


  @Post("create-todolist")
  async createTodoList(@Body() todoList:TodoListDto):Promise<TodoList>{
    return await this.todolistService.createTodoList(todoList)
  }

  @Post("create-todo")
  async createTodo(@Body() todo:TodoDto):Promise<Todo>{
    return await this.todolistService.createTodo(todo)
    
  }
  @Get("find-todolist/:todoListId")
  async findTodoListById(@Param("todoListId") todoListId:number):Promise<TodoList>{
    return await this.todolistService.findTodoListById(todoListId)

  }
  @Delete("del-todolist-by-id/:todoListId")
  async delTodoListById(@Param("todoListId") todoListId:number):Promise<void>{
    
    return await this.todolistService.delTodoListById(todoListId)
  }

  @Delete("del-todo-by-id/:todoId")
  async delTodoById(@Param("todoId") todoId:number):Promise<void>{

    return await this.todolistService.delTodoById(todoId)
  }

  @Put("update-isChecked-by-todoId/:todoId")
  async updateIsChecked(@Param("todoId") todoId:number,@Body("isChecked") isChecked:boolean):Promise<Todo>{
    return await this.todolistService.updateIsChecked(todoId, isChecked)
  }



}
