import axios from 'axios';
import dotenv from 'dotenv';
import { Response } from 'express';
import { handleError } from '../utils/error.handle';

dotenv.config();
// Obtengo los url de los endpoints de spacex
const API_LAUNCHES = process.env.API_LAUNCHES;
const API_ROCKETS = process.env.API_ROCKETS;

// función para obtener los launches desde la api desde spacex
const getLaunches = async (res: Response, flight_number: string) => {
  try {
    // const result = await axios.get(API_LAUNCHES as string, {
    //   params: { flight_number },
    // });
    const result = await axios.get(
      `${API_LAUNCHES}/${flight_number}` as string
    );
    // console.log(result.data[0].rocket.rocket_id);

    return result.data;
  } catch (error) {
    // Function para manegar errores
    handleError(res, 'ERROR GET LAUNCHES');
  }
};

// función para obtener los Rockets desde la api desde spacex
const getRockets = async (res: Response, rocket_id: string) => {
  try {
    // const result = await axios.get('https://api.spacexdata.com/v3/rockets', {
    //   params: { id: rocket_id },
    // });
    const result = await axios.get(`${API_ROCKETS}/${rocket_id}` as string);
    // console.log(result.data);
    return result.data;
  } catch (error) {
    // Function para manegar errores
    handleError(res, 'ERROR GET ROCKETS');
  }
};

export { getLaunches, getRockets };
