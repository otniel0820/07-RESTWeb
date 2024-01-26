import { Request, Response } from "express";



export class TodosController {

    //!Inyeccion de dependencias

    constructor(){}

    public getAll = (req: Request, res:Response) => {
        res.json([
          { id: 1, text: "Buy milk", createdAt: new Date() },
          { id: 1, text: "Buy bread", createdAt: null },
          { id: 1, text: "Buy butter", createdAt: new Date() }
      ]);
      }
      
}