import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDTO): Promise<TodoEntity>

    //Todo: paginacion 
    abstract getAll(): Promise<TodoEntity[]>

    abstract findById(id: number): Promise<TodoEntity>
    abstract updateTodo(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity>
    abstract deleteTodo(id: number): Promise<TodoEntity>

}