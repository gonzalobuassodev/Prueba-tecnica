import { Router } from 'express';
import { getItems } from '../controllers/spacex.controllers';

const router = Router();

// Ruta obtener los launches
router.get('/getlaunches/:id', getItems);

export { router };
