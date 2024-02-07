import { Router } from "express";
import { TodosController } from "./controller";


export class TodosRoutes {
    static get routes(): Router {
      const router = Router();
      const todoController = new TodosController();
  
  
      router.get("/", todoController.getAllTodo);
      router.get("/:id", todoController.getTodoById);
      router.post("/", todoController.createTodo);
      router.put("/:id", todoController.updateTodo);
  
      return router;
    }
  }