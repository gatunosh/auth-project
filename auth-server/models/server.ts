import express, { Application } from 'express';
import cors from 'cors';
import authRouter from '../routes/auth.routes';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // Initialize methods
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log( `Server running port: ${this.port}` );
        });
    }

    middlewares() {

        // CORS configuration
        this.app.use(cors());
        // Allowed JSON request body
        this.app.use(express.json());
        // Set a public folder
        this.app.use(express.static('public'));

    }

    routes() {

        // Authentication Routes
        this.app.use( this.apiPaths.auth, authRouter );

    }
    
}

export default Server;