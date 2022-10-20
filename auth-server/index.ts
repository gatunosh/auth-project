import dotenv from 'dotenv';

// Configurar dot.env
dotenv.config();

import Server from './models/server';

const server = new Server();

server.listen();
