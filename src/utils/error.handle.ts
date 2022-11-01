import { Response } from 'express';

// Función para manegar errores
const handleError = (res: Response, error: string) => {
  res.status(500);
  res.json({ error });
};

export { handleError };
