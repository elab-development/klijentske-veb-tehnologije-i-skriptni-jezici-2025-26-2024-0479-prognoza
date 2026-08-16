import { Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-[#f2f2f5] shadow-inner'>
      <div className='container mx-auto px-4 py-6 text-center text-sm text-[#272745]'>
        <p className='flex items-center justify-center gap-2'>
          <Cloud size={18} className='text-[#272745]' />
          <span className='text-[#272745] font-semibold'>
            &copy; {new Date().getFullYear()} WeatherApp
          </span>
        </p>
        <p className='mt-1'>
          Data powered by{' '}
          <a
            href='https://openweathermap.org/'
            target='_blank'
            rel='noreferrer'
            className='text-[#272745] font-medium hover:underline'
          >
            OpenWeatherMap
          </a>
        </p>
      </div>
    </footer>
  );
}