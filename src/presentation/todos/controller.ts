import { Request, Response } from "express";
import { prisma } from "../../data/postgresql";
import { CreateTodoDTO } from '../../domain/dtos/todos/create-todo.dto';

export class TodosController {
  //!Inyeccion de dependencias

  constructor() {}

  //Obtener todos los todos
  public getAllTodo = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  };

  //Obtener los todos por medio del id y haciendo manejo de errores de servidor
  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).send("Bad request");

    const todo = await prisma.todo.findFirst({
      where: { id: id }, // el where en este caso es la key que te permite buscar en la base de datos por id pasanole el id como value
    });

    todo
      ? res.status(200).json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDTO.create(req.body)

    if(error) return res.status(400).json({error})


    const todo = await prisma.todo.create({
       data: createTodoDto!
      });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).send("Bad request");

    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    if (!todo) res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;

    const updateTodo = await prisma.todo.update({
      where: { id },
      data: { text, completedAt: (completedAt)? new Date(completedAt): null },
    });

    res.json(updateTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
      where: { id },
    });
    
    if (!todo) res.status(404).json({ error: `Todo with id ${id} not found` });

    try {
      const deleted = await prisma.todo.delete({
          where: { id },
      });

      res.json(deleted);
  } catch (error) {
      res.status(400).json({ error: `Todo with id ${id} not found` });
  }

  };
}
