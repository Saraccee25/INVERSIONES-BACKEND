import http from 'node:http';
import app from './src/app';
import dotenv from 'dotenv';
import pool from './src/config/db';


dotenv.config();


const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);


server.on('listening', () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  console.error(error);
});

pool.getConnection().then((connection) => {
  console.log('Connected to database');
  connection.release();
}).catch((error) => {
  console.error('Error connecting to database:', error);
});