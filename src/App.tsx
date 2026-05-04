import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { lazy, Suspense, useEffect } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './lib/firebase';

// Public Pages (loaded immediately)
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';

// Admin Pages (lazy loaded — not needed on first visit)
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/Login';
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminMenu = lazy(() => import('./pages/admin/Menu'));
const AdminTables = lazy(() => import('./pages/admin/Tables'));
const AdminReservationsList = lazy(() => import('./pages/admin/ReservationsList'));
const AdminStaff = lazy(() => import('./pages/admin/Staff'));
const AdminReviews = lazy(() => import('./pages/admin/Reviews'));

const AdminSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="flex justify-center items-center h-full py-40">
      <div className="w-8 h-8 border-2 border-bordeaux border-t-transparent rounded-full animate-spin" />
    </div>
  }>
    {children}
  </Suspense>
);

export default function App() {
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/menu" element={<PublicLayout><MenuPage /></PublicLayout>} />
          <Route path="/reservations" element={<PublicLayout><ReservationPage /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout><AdminSuspense><AdminDashboard /></AdminSuspense></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><AdminSuspense><AdminOrders /></AdminSuspense></AdminLayout>} />
          <Route path="/admin/menu" element={<AdminLayout><AdminSuspense><AdminMenu /></AdminSuspense></AdminLayout>} />
          <Route path="/admin/tables" element={<AdminLayout><AdminSuspense><AdminTables /></AdminSuspense></AdminLayout>} />
          <Route path="/admin/reservations" element={<AdminLayout><AdminSuspense><AdminReservationsList /></AdminSuspense></AdminLayout>} />
          <Route path="/admin/staff" element={<AdminLayout><AdminSuspense><AdminStaff /></AdminSuspense></AdminLayout>} />
          <Route path="/admin/reviews" element={<AdminLayout><AdminSuspense><AdminReviews /></AdminSuspense></AdminLayout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
