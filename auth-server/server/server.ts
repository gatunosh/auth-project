import express, { Application } from 'express';
import cors from 'cors';
import authRouter from '../routes/auth.routes';
import morgan from 'morgan';
import { AppDataSource } from '../db/connection';

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
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log( `Server running port: ${this.port}` );
        });
    }

    middlewares() {        

        // Morgan to catch up the request
        this.app.use(morgan('dev'));
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

    async dbConnection() {
        try {
            await AppDataSource.initialize();
            console.log(`Database connected successfully`);
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default Server;