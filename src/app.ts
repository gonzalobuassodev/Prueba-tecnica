import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as SpaceXRouter } from './routes/spacex.routes';

dotenv.config();

// defino la app del servidor
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas del projecto
app.use(SpaceXRouter);

export default app;
