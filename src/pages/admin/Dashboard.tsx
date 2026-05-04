import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Order } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore-utils';
import { motion } from 'motion/react';
import { TrendingUp, Users, DollarSign, Utensils, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'), 
          where('status', '==', 'paid'), 
          orderBy('paidAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Analytics Helpers
  const getDailyRevenue = () => {
    const today = new Date().toISOString().split('T')[0];
    return orders
      .filter(o => o.paidAt && o.paidAt.startsWith(today))
      .reduce((sum, o) => sum + o.totalAmount, 0);
  };

  const getMonthlyRevenue = () => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    return orders
      .filter(o => o.paidAt && o.paidAt.startsWith(thisMonth))
      .reduce((sum, o) => sum + o.totalAmount, 0);
  };

  const getYearlyRevenue = () => {
    const thisYear = new Date().getFullYear().toString();
    return orders
      .filter(o => o.paidAt && o.paidAt.startsWith(thisYear))
      .reduce((sum, o) => sum + o.totalAmount, 0);
  };

  const getPopularDishes = () => {
    const dishes: { [key: string]: { count: number, name: string } } = {};
    orders.forEach(o => {
      o.items.forEach(i => {
        if (!dishes[i.id]) dishes[i.id] = { count: 0, name: i.name };
        dishes[i.id].count += i.quantity;
      });
    });
    return Object.values(dishes).sort((a, b) => b.count - a.count).slice(0, 5);
  };

  // Chart data for last 7 days
  const getChartData = () => {
    const data: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      data[d.toISOString().split('T')[0]] = 0;
    }
    orders.forEach(o => {
      const date = o.paidAt?.split('T')[0];
      if (date && data[date] !== undefined) data[date] += o.totalAmount;
    });
    return Object.entries(data).map(([date, amount]) => ({ 
      date: new Date(date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' }), 
      amount 
    }));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <div className="w-10 h-10 border-2 border-bordeaux border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const stats = [
    { label: 'Oggi', value: `${getDailyRevenue().toFixed(2)}€`, icon: DollarSign, color: 'text-bordeaux' },
    { label: 'Questo Mese', value: `${getMonthlyRevenue().toFixed(2)}€`, icon: TrendingUp, color: 'text-ink' },
    { label: 'Quest\'Anno', value: `${getYearlyRevenue().toFixed(2)}€`, icon: Calendar, color: 'text-ink' },
    { label: 'Totale Ordini', value: orders.length, icon: Utensils, color: 'text-ink' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-4xl text-ink font-light">Performance Giornaliera</h1>
        <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">Rapporto attività e statistiche di vendita</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-8 border border-ink/5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <s.icon size={20} className="text-ink/20" />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-ink/40 mb-1">{s.label}</p>
            <p className={`text-2xl font-serif font-medium ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 border border-ink/5 shadow-sm flex flex-col">
          <h3 className="text-xs uppercase tracking-widest font-bold mb-10 text-ink/40 border-b border-ink/5 pb-4">Attività degli ultimi 7 giorni</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#666' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(128,0,32,0.05)' }} 
                  contentStyle={{ borderRadius: '0px', border: '1px solid rgba(0,0,0,0.05)', fontSize: '10px' }}
                />
                <Bar dataKey="amount" fill="#800020" radius={[2, 2, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Seller */}
        <div className="bg-white p-8 border border-ink/5 shadow-sm">
          <h3 className="text-xs uppercase tracking-widest font-bold mb-10 text-ink/40 border-b border-ink/5 pb-4">I Piatti più Amati</h3>
          <div className="space-y-8">
            {getPopularDishes().map((dish, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-serif italic text-bordeaux">#{idx + 1}</span>
                  <p className="text-sm font-medium">{dish.name}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold">{dish.count}</span>
                  <span className="text-[9px] uppercase tracking-widest text-ink/30 font-bold">Vendite</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
