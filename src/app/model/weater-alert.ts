export enum WeatherAlertType {
  CRITICO = 'CRITICO',
  ADVERTENCIA = 'ADVERTENCIA'
}

export enum WeatherAlertEstate {
  NUEVA = 'NUEVA',
  LEIDA = 'LEIDA'
}

export interface UserDto {
  id: number;
}

export class WeatherAlert {
  id: number;
  userid: UserDto;
  waTitle: string;
  waDescription: string;
  waDate: string;
  waType: WeatherAlertType;
  estado: WeatherAlertEstate;
  visible: boolean;
}
