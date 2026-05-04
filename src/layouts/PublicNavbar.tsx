import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
    isScrolled ? 'bg-white/95 py-4 border-b border-ink/5' : 'bg-transparent py-8'
  }`;

  const textClass = isScrolled ? 'text-ink' : (isHome ? 'text-white' : 'text-ink');
  const logoClass = `font-serif text-3xl tracking-tight transition-colors duration-500 absolute left-1/2 -translate-x-1/2 ${
    isScrolled ? 'text-bordeaux' : (isHome ? 'text-white' : 'text-bordeaux')
  }`;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <div className={`hidden md:block text-[10px] tracking-[0.3em] uppercase font-semibold opacity-40 ${textClass}`}>
          Est. 1994
        </div>
        
        <Link to="/" className={logoClass}>
          Pollo Gigante
        </Link>
        
        <div className="hidden md:flex items-center space-x-12">
          {[
            { name: 'Prenotazioni', path: '/reservations' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors duration-500 hover:text-bordeaux ${textClass}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button className={`md:hidden p-2 ${textClass}`}>
          <MenuIcon size={24} />
        </button>
      </div>
    </nav>
  );
}
