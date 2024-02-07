import { Router } from "express";
import { TodosController } from "./controller";


export class TodosRoutes {
    static get routes(): Router {
      const router = Router();
      const todoController = new TodosController();
  
  
      router.get("/", todoController.getAll);
      router.get("/:id", todoController.getById);
  
      return router;
    }
  }