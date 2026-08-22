import { CalendarDays, AlertTriangle, MapPin } from 'lucide-react';

import { useLocationStore } from '../store/location';
import { useWeeklyWeather } from '../hooks/useWeeklyWeather';
import WeatherDayCard from '../components/weather/WeatherDayCard';

export default function Weekly() {
  const { location } = useLocationStore();
  const lat = location?.lat ?? null;
  const lon = location?.lng ?? null;

  const { data, loading, error } = useWeeklyWeather(lat, lon, {
    units: 'metric',
  });

  if (!location) {
    return (
      <div className='max-w-4xl mx-auto'>
        <div className='rounded-3xl bg-blue-50 ring-1 ring-blue-100 p-6 md:p-8'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='text-blue-600 mt-0.5' />
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>
                No location set
              </h2>
              <p className='text-slate-600 mt-1'>
                Go to{' '}
                <a href='/' className='text-[#272745] ounderline'>
                  Home
                </a>{' '}
                and pick a location to see the weekly forecast.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='max-w-5xl mx-auto'>
        <div className='rounded-3xl bg-white shadow-xl ring-1 ring-blue-100 p-6 md:p-8'>
          <div className='animate-pulse space-y-4'>
            <div className='h-6 w-1/3 bg-slate-200 rounded' />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className='rounded-2xl p-4 ring-1 ring-blue-100 bg-blue-50/60 h-32'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto'>
        <div className='rounded-3xl bg-white shadow-xl ring-1 ring-red-100 p-6 md:p-8'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='text-red-600 mt-0.5' />
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>
                Couldn’t load weekly forecast
              </h2>
              <p className='text-slate-600 mt-1'>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tzOffset = data?.timezone_offset ?? 0;
  const days = data?.daily?.slice(0, 7) || [];

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='rounded-3xl bg-white shadow-xl ring-1 ring-blue-100 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-700'>
            <MapPin size={18} className='text-blue-600' />
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              {location.label || 'Weekly forecast'}
            </h2>
          </div>
          <CalendarDays className='text-blue-600' />
        </div>

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {days.map((d) => (
            <WeatherDayCard key={d.dt} day={d} tzOffset={tzOffset} />
          ))}
        </div>
      </div>
    </div>
  );
}