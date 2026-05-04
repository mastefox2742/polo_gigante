import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './lib/firebase';

// Public Pages
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminTables from './pages/admin/Tables';
import AdminReservationsList from './pages/admin/ReservationsList';
import AdminLogin from './pages/admin/Login';

import AdminMenu from './pages/admin/Menu';
import AdminStaff from './pages/admin/Staff';

export default function App() {
  useEffect(() => {
    // CRITICAL: Validate Connection to Firestore
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
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
          <Route path="/admin/menu" element={<AdminLayout><AdminMenu /></AdminLayout>} />
          <Route path="/admin/tables" element={<AdminLayout><AdminTables /></AdminLayout>} />
          <Route path="/admin/reservations" element={<AdminLayout><AdminReservationsList /></AdminLayout>} />
          <Route path="/admin/staff" element={<AdminLayout><AdminStaff /></AdminLayout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
