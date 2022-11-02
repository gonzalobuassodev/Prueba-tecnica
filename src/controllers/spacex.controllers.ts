import { Request, Response } from 'express';
import { getLaunches, getRockets } from '../apiService/spacex.apiservice';
import { IFlight, IRocketResult } from '../interfaces/spacex.interface';
import { handleError } from '../utils/error.handle';

const getItems = async (req: Request, res: Response) => {
  try {
    // Recupero el id que viene por parametro desde el cliente
    const id = req.params?.id;

    if (id) {
      // Realizo la consulta a la api de spacex para obtener los Launches
      const resultLaunches: IFlight = await getLaunches(res, id);

      if (resultLaunches) {
        // Realizo la consulta a la api de spacex para obtener los Rockets
        const resultRockets: IRocketResult = await getRockets(
          res,
          resultLaunches.rocket.rocket_id
        );

        //   Genero la respuesta solicitdad para enviar al cliente
        let obj: IFlight = {
          flight_number: resultLaunches.flight_number,
          mission_name: resultLaunches.mission_name,
          rocket: {
            rocket_id: resultRockets.rocket_id,
            rocket_name: resultRockets.rocket_name,
            description: resultRockets.description,
            images: resultRockets.flickr_images,
          },
          payloads: [
            {
              payload_id: resultLaunches.mission_name,
              manufacturer: 'Boeing', // DATO NO ENCONTRADO EN LA RESPUESTA DEL API
              type: resultRockets.rocket_type,
            },
          ],
        };

        res.json(obj);
        return;
      } else {
        res.status(404);
        res.send({ error: 'Flight not found' });
        return;
      }
    } else {
      res.send({ error: 'Flight not found' });
      return;
    }
  } catch (error) {
    // Function para manegar errores
    // console.log(error);
    handleError(res, 'ERROR GET ITEMS');
  }
};

export { getItems };
