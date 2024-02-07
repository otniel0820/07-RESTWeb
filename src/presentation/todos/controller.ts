import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", createdAt: new Date() },
  { id: 1, text: "Buy bread", createdAt: null },
  { id: 1, text: "Buy butter", createdAt: new Date() },
];

export class TodosController {
  //!Inyeccion de dependencias

  constructor() {}

  public getAll = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getById = (req: Request, res: Response) => {

    const id = +req.params.id;
    
    if (isNaN(id)) return res.status(400).send("Bad request");
    
    const todo = todos.find((todo) => todo.id === id);
    todo ? res.json(todo) : res.status(404).send("Not found");
  };
}
