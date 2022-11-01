import { Request, Response } from 'express';
import { access } from 'fs';
import { getLaunches, getRockets } from '../apiService/spacex.apiservice';
import {
  IFlight,
  IRocket,
  IRocketResult,
} from '../interfaces/spacex.interface';
import { handleError } from '../utils/error.handle';

const getItems = async (req: Request, res: Response) => {
  try {
    // Recupero el id que viene por parametro desde el cliente
    const { id } = req.params;

    // Realizo la consulta a la api de spacex para obtener los Launches
    const resultLaunches: IFlight[] = await getLaunches(res, id);

    if (resultLaunches.length > 0) {
      // Realizo la consulta a la api de spacex para obtener los Rockets
      const resultRockets: IRocketResult[] = await getRockets(
        res,
        resultLaunches[0].rocket.rocket_id
      );

      // Genero la respuesta solicitdad para enviar al cliente
      let obj: IFlight = {
        flight_number: resultLaunches[0].flight_number,
        mission_name: resultLaunches[0].mission_name,
        rocket: {
          rocket_id: resultRockets[0].rocket_id,
          rocket_name: resultRockets[0].rocket_name,
          description: resultRockets[0].description,
          images: resultRockets[0].flickr_images,
        },
        payloads: [
          {
            payload_id: resultLaunches[0].mission_name,
            manufacturer: 'Boing', // DATO NO ENCONTRADO EN LA RESPUESTA DEL API
            type: resultRockets[0].rocket_type,
          },
        ],
      };

      res.json({ obj });
    } else {
      res.json({ error: 'Flight not found' });
    }
  } catch (error) {
    // Function para manegar errores
    handleError(res, 'ERROR GET ITEMS');
  }
};

export { getItems };