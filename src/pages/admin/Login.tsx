import { loginWithGoogle, loginWithEmail, getRedirectResult, auth } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLogin() {
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRedirectResult(auth).catch(() => {});
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setAuthError('Credenziali non valide o errore di connessione.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return null;
  if (user && isAdmin) return <Navigate to="/admin" />;

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-xl p-12 border border-white/10 text-center"
      >
        <h1 className="font-serif text-4xl text-white mb-4 italic">Pollo Gigante</h1>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-12">Gestione Ristorante • Accesso Riservato</p>
        
        <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4 mb-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs tracking-widest focus:outline-none focus:border-white/50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs tracking-widest focus:outline-none focus:border-white/50"
            required
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-white text-ink flex items-center justify-center space-x-4 hover:bg-bordeaux hover:text-white transition-all duration-500 font-bold text-xs uppercase tracking-widest disabled:opacity-50"
          >
            <Mail size={18} />
            <span>{isLoading ? 'Accesso...' : 'Accesso Email'}</span>
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-[#1a1a1a] text-white/40 uppercase tracking-widest text-[9px] font-bold">Oppure</span>
          </div>
        </div>

        <button 
          onClick={loginWithGoogle}
          className="w-full py-4 border border-white/20 text-white flex items-center justify-center space-x-4 hover:bg-white/10 transition-all duration-500 font-bold text-xs uppercase tracking-widest"
        >
          <LogIn size={18} />
          <span>Accesso Google</span>
        </button>

        {authError && (
          <p className="mt-8 text-bordeaux text-xs italic font-medium">
            {authError}
          </p>
        )}
        
        {user && !isAdmin && !authError && (
          <p className="mt-8 text-bordeaux text-xs italic font-medium">
            Accesso negato. Quest'area è riservata al titolare o allo staff autorizzato.
          </p>
        )}
      </motion.div>
    </div>
  );
}
