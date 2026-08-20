export type Units = 'metric' | 'imperial';

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherSys {
  country?: string;
  sunrise?: number;
  sunset?: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
}

export interface WeatherCurrentResponse {
  coord: { lon: number; lat: number };
  weather: WeatherCondition[];
  base: string;
  main: WeatherMain;
  visibility?: number;
  wind?: WeatherWind;
  dt: number;
  sys?: WeatherSys;
  timezone?: number;
  name: string;
}