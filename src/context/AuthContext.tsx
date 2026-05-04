import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isAdmin: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const isDefaultAdmin = user.email === import.meta.env.VITE_ADMIN_EMAIL || user.email === 'fresneilm139@gmail.com';
        if (isDefaultAdmin) {
          setIsAdmin(true);
        } else {
          // Check if user is in admins collection or authorized_staff
          try {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));
            let isAuth = adminDoc.exists();
            
            if (!isAuth && user.email) {
              const staffDoc = await getDoc(doc(db, 'authorized_staff', user.email));
              isAuth = staffDoc.exists();
            }
            
            setIsAdmin(isAuth);
          } catch (e) {
            console.warn("User is not an admin or lookup failed", e);
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
