import { useLocationStore } from '../store/location';
import { useHourlyWeather } from '../hooks/useHourlyWeather';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import HourCard from '../components/weather/HourCard';

export default function Hourly() {
  const { location } = useLocationStore();
  const lat = location?.lat ?? null;
  const lon = location?.lng ?? null;

  const { data, loading, error } = useHourlyWeather(lat, lon, {
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
                <a href='/' className='text-blue-700 underline'>
                  Home
                </a>{' '}
                and pick a location to see the hourly forecast.
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
            <div className='flex gap-4 overflow-x-auto'>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className='h-36 w-40 rounded-2xl bg-blue-50/60 ring-1 ring-blue-100'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='max-w-4xl mx-auto'>
        <div className='rounded-3xl bg-white shadow-xl ring-1 ring-red-100 p-6 md:p-8'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='text-red-600 mt-0.5' />
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>
                Couldn’t load hourly forecast
              </h2>
              <p className='text-slate-600 mt-1'>{error || 'Unknown error'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tz = data.timezone_offset ?? 0;
  const hours = data.hourly.slice(0, 24);

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='rounded-3xl bg-white shadow-xl ring-1 ring-blue-100 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-700'>
            <MapPin size={18} className='text-blue-600' />
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              {location.label || 'Hourly forecast'}
            </h2>
          </div>
          <Clock className='text-blue-600' />
        </div>

        <div className='mt-6 flex gap-4 overflow-x-auto pb-2'>
          {hours.map((h) => (
            <HourCard key={h.dt} hour={h} tzOffset={tz} />
          ))}
        </div>
      </div>
    </div>
  );
}