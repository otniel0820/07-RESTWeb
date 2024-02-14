import express, { Router } from "express";
import compression from "compression";
import path from "path";

interface Options {
  port: number;
  routes: Router
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes
  }

  async start() {
    //!Middlewares

    this.app.use(express.json()); //Este middelware  permite que los datos enviados por el body sean interpretados como un formato raw
    this.app.use(express.urlencoded({extended: true}));// Este middelware permite que los datos enviados sean interpretados como url-encode que es usado mucho en angular
    this.app.use(compression()) // se usa para la compresion de nuestras request y response, es una buena practica recomendadad por express para mejorar la respuesta del servidor 
    //!public folder

    this.app.use(express.static(this.publicPath));

    //!Routes

    this.app.use(this.routes)
    

    //*SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
