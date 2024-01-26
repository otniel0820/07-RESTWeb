import { Router } from "express";
import { TodosController } from "./controller";


export class TodosRoutes {
    static get routes(): Router {
      const router = Router();
      const todoController = new TodosController();
  
  
      router.get("/", todoController.getAll);
  
      return router;
    }
  }