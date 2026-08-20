import type { Units, WeatherCurrentResponse } from '../types/weather';
export class WeatherService {
  static key = import.meta.env.VITE_OWM_API_KEY as string;

  static async current(
    lat: number,
    lon: number,
    units: Units = 'metric'
  ): Promise<WeatherCurrentResponse> {
    console.log('API Key:', this.key);

    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      units,
      appid: this.key,
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `OpenWeather error (${res.status}): ${text || res.statusText}`
      );
    }
    return res.json();
  }

  static iconUrl(code: string, size: '2x' | '4x' = '4x') {
    const suffix = size === '4x' ? '@4x' : '@2x';
    return `https://openweathermap.org/img/wn/${code}${suffix}.png`;
  }
}