import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-[#f2f2f5] shadow-md'>
      <nav className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Logo */}
        <div className='text-xl font-bold text-[#272745] flex items-center gap-2'>
          WeatherApp
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className='md:hidden text-[#272745] focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-14 left-0 w-full bg-[#f2f2f5] shadow-md md:static md:block md:w-auto md:shadow-none`}
        >
          <ul className='flex flex-col md:flex-row md:space-x-6'>
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/current', label: 'Current' },
              { to: '/weekly', label: 'Week' },
              { to: '/monthly', label: 'Month' },
              { to: '/details', label: 'Details' },
            ].map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `block px-4 py-2 transition border-b-2 ${
                      isActive
                        ? 'border-[#272745] text-[#272745'
                        : 'border-transparent text-slate-700 hover:bg-[#E4E4EF] hover:border-[#272745]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}