import { ReactNode } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../lib/firebase';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Table as TableIcon,
  CalendarClock,
  LogOut,
  Settings,
  ChefHat,
  Users,
  Star
} from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return (
    <div className="min-h-screen bg-beige flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-bordeaux border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!user || !isAdmin) return <Navigate to="/admin/login" />;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/orders', icon: UtensilsCrossed, label: 'Ordini' },
    { to: '/admin/menu', icon: ChefHat, label: 'Menu' },
    { to: '/admin/tables', icon: TableIcon, label: 'Tavoli' },
    { to: '/admin/reservations', icon: CalendarClock, label: 'Prenotazioni' },
    { to: '/admin/staff', icon: Users, label: 'Staff' },
    { to: '/admin/reviews', icon: Star, label: 'Recensioni' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDF7] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-white p-8 flex flex-col fixed h-full top-0 left-0 z-50">
        <div className="mb-12">
          <h2 className="font-serif text-2xl mb-1 italic">Pollo Gigante</h2>
          <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Area Amministrazione</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) => 
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-bordeaux text-white shadow-lg' : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              <span className="text-xs font-medium uppercase tracking-widest">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10 space-y-2">
          <button className="flex items-center space-x-4 px-4 py-3 w-full text-white/50 hover:text-white transition-colors">
            <Settings size={18} />
            <span className="text-xs font-medium uppercase tracking-widest">Impostazioni</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-4 px-4 py-3 w-full text-bordeaux hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-xs font-medium uppercase tracking-widest">Disconnetti</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-12">
        {children}
      </main>
    </div>
  );
}
