// Interface Launches
export interface IFlight {
  flight_number: number;
  mission_name: string;
  rocket: IRocket;
  payloads: IPayload[];
}

// Interface Rockets
export interface IRocket {
  rocket_id: string;
  rocket_name: string;
  description: string;
  images: string[];
}

// Interface Resultados de Rockets
export interface IRocketResult extends IRocket {
  rocket_type: string;
  flickr_images: string[];
}

// Interface Payload
export interface IPayload {
  payload_id: string;
  manufacturer: string;
  type: string;
}
