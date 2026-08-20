import { useLocationStore } from '../store/location';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import { ThermometerSun, MapPin, AlertTriangle } from 'lucide-react';
import { WeatherService } from '../services/WeatherService';

export default function Current() {
  const { location } = useLocationStore();
  const lat = location?.lat ?? null;
  const lon = location?.lng ?? null;

  const { data, loading, error } = useCurrentWeather(lat, lon, {
    units: 'metric',
  });

  if (!location) {
    return (
      <div className='max-w-3xl mx-auto'>
        <div className='rounded-3xl bg-blue-50 ring-1 ring-blue-100 p-6 md:p-8'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='text-[#272745] mt-0.5' />
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>
                No location set
              </h2>
              <p className='text-slate-600 mt-1'>
                Go to{' '}
                <a href='/' className='text-[#272745] underline'>
                  Home
                </a>{' '}
                and pick a location to see current weather.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='max-w-3xl mx-auto'>
        <div className='rounded-3xl bg-white shadow-xl ring-1 ring-blue-100 p-6 md:p-8'>
          <div className='animate-pulse'>
            <div className='h-6 w-1/3 bg-slate-200 rounded' />
            <div className='mt-4 flex items-center gap-6'>
              <div className='h-28 w-28 rounded-2xl bg-slate-200' />
              <div className='h-14 w-32 bg-slate-200 rounded' />
            </div>
            <div className='mt-4 h-4 w-2/5 bg-slate-200 rounded' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-3xl mx-auto'>
        <div className='rounded-3xl bg-[#f2f2f5] shadow-xl ring-1 ring-red-100 p-6 md:p-8'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='text-red-600 mt-0.5' />
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>
                Couldn’t load weather
              </h2>
              <p className='text-slate-600 mt-1'>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const locLabel = location.label || data?.name || 'Selected location';
  const temp = Math.round(data?.main?.temp ?? 0);
  const cond = data?.weather?.[0];
  const iconUrl = cond?.icon ? WeatherService.iconUrl(cond.icon, '4x') : null;
  const descr = cond?.description
    ? cond.description.replace(/\b\w/g, (m) => m.toUpperCase())
    : '';

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='rounded-3xl bg-white shadow-xl ring-1 ring-blue-100 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-700'>
            <MapPin size={18} className='text-blue-600' />
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              {locLabel}
            </h2>
          </div>
          <ThermometerSun className='text-blue-600' />
        </div>

        <div className='mt-4 flex items-center gap-6'>
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={cond?.description || 'weather icon'}
              className='h-28 w-28 rounded-2xl bg-white ring-1 ring-blue-100 p-2'
              loading='eager'
            />
          ) : (
            <div className='h-28 w-28 rounded-2xl bg-blue-50 ring-1 ring-blue-100' />
          )}

          <div>
            <div className='text-5xl md:text-6xl font-extrabold text-slate-900'>
              {isFinite(temp) ? `${temp}°C` : '--'}
            </div>
            <div className='mt-1 text-slate-600 capitalize'>{descr || '—'}</div>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600'>
          <div className='rounded-xl bg-blue-50/60 ring-1 ring-blue-100 p-3'>
            <span className='font-semibold text-slate-900'>Feels like:</span>{' '}
            {Math.round(data?.main?.feels_like ?? NaN)}°C
          </div>
          <div className='rounded-xl bg-blue-50/60 ring-1 ring-blue-100 p-3'>
            <span className='font-semibold text-slate-900'>Humidity:</span>{' '}
            {data?.main?.humidity != null ? `${data.main.humidity}%` : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}