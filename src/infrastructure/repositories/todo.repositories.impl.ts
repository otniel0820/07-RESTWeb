import { CreateTodoDTO, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDTO } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasource
    ){}
    create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<TodoEntity> {
        return  this.datasource.findById(id);
    }
    updateTodo(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
        return  this.datasource.updateTodo(updateTodoDto)
    }
    deleteTodo(id: number): Promise<TodoEntity> {
        return  this.datasource.deleteTodo(id);
    }

}