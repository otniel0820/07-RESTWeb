import { prisma } from "../../data/postgresql";
import { CreateTodoDTO, TodoDatasource, TodoEntity, UpdateTodoDTO } from "../../domain";



export class TodoDatasourceImpl implements TodoDatasource {
    async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
           });

           return TodoEntity.fromObject(todo)
     
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(todo => TodoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id: id }, // el where en este caso es la key que te permite buscar en la base de datos por id pasanole el id como value
          });
        
        if(!todo)throw (`Todo with id ${id} not found`)
        return TodoEntity.fromObject(todo)
    }

    async updateTodo(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id)
        const updateTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values,
          });
        
        return TodoEntity.fromObject(updateTodo)
    }

    async deleteTodo(id: number): Promise<TodoEntity> {
        await this.findById(id)
        const deleted = await prisma.todo.delete({
            where: { id },
        });

        return TodoEntity.fromObject(deleted);
        
    }

}