import express from 'express'


export class Server{

    private app = express()



    async start(){
        
        //!Middlewares

        //!public folder

        this.app.use(express.static('public'))


        this.app.listen(3000,()=>{
            console.log(`Server running on port ${3000}`);
            
        })
        
    }
}