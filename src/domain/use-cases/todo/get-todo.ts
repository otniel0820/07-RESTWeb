import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface deleteTodoUseCase{
    execute(id: number):Promise<TodoEntity>
}

export class GetTodo implements deleteTodoUseCase{
    constructor(
        private readonly repository: TodoRepository
    ){}
    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id)
    }
}