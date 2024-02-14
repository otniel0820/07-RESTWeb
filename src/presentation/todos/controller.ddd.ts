import { Request, Response } from "express";
import { CreateTodoDTO } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  //!Inyeccion de dependencias

  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  //Obtener todos los todos
  public getAllTodo = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos)
  };

  //Obtener los todos por medio del id y haciendo manejo de errores de servidor
  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
      
    } catch (error) {
      res.status(400).json({ error });
    }

  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDTO.create(req.body)

    if(error) return res.status(400).json({error})


   const todo = await this.todoRepository.create(createTodoDto!)

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const[error, updateTodoDto]= UpdateTodoDTO.create({...req.body,id})

    if (error) return res.status(400).json({error})

    const updateTodo = await this.todoRepository.updateTodo(updateTodoDto!)
    return res.json(updateTodo)
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = await  this.todoRepository.deleteTodo(id);
    return res.json(deletedTodo)

  };
}
