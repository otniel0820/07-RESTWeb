import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 1, text: "Buy bread", completedAt: null },
  { id: 1, text: "Buy butter", completedAt: new Date() },
];

export class TodosController {
  //!Inyeccion de dependencias

  constructor() {}

  //Obtener todos los todos
  public getAllTodo = (req: Request, res: Response) => {
    return res.json(todos);
  };

  //Obtener los todos por medio del id y haciendo manejo de errores de servidor
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) return res.status(400).send("Bad request");

    const todo = todos.find((todo) => todo.id === id);
    todo ? res.json(todo) : res.status(404).send("Not found");
  };

  //Creacion de un nuevo Todo estableciendo el body con el que queremos que se cree el usuario puede mandar lo que quiera en el body pero en este caso el backend solo tomnara lo que necesita que en este caso es la logica que le hemos colocado dentro de createTodo
  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).send("Bad request");

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: new Date(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).send("Bad request");

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;

    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date() || todo.completedAt);

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {

    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).send("Bad request");

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    todos.splice(todos.indexOf(todo), 1);

    res.json(todo);

    return res.status(204).send("No Content");
    

  }

}
