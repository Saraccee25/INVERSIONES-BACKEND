import express, { Request, Response, NextFunction } from 'express';
// import cors from 'cors';



const app = express();


// app.use(cors({
//     origin: 'http://localhost:5173', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

app.use(express.json());



app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'Not found'
  });
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;