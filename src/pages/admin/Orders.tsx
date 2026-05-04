import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Order, MenuItem, Table } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore-utils';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, CheckCircle, Clock, Trash2, ShoppingCart, User } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Order State
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [cart, setCart] = useState<{item: MenuItem, qty: number}[]>([]);

  useEffect(() => {
    // Real-time orders
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'orders'));

    // Fetch Tables and Menu
    const fetchData = async () => {
      const tSnap = await getDocs(query(collection(db, 'tables'), where('isActive', '==', true)));
      setTables(tSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Table)));
      
      const mSnap = await getDocs(query(collection(db, 'menuItems'), where('isActive', '==', true)));
      setMenuItems(mSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem)));
    };
    fetchData();

    return unsubscribe;
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) return prev.map(i => i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.item.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const submitOrder = async () => {
    if (!selectedTable || cart.length === 0) return;
    try {
      const total = cart.reduce((acc, i) => acc + i.item.price * i.qty, 0);
      await addDoc(collection(db, 'orders'), {
        tableId: selectedTable.id,
        tableNumber: selectedTable.number,
        items: cart.map(c => ({ id: c.item.id, name: c.item.name, price: c.item.price, quantity: c.qty })),
        totalAmount: total,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setIsAdding(false);
      setCart([]);
      setSelectedTable(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'orders');
    }
  };

  const markAsPaid = async (orderId: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'paid',
        paidAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl text-ink font-light">Presa Ordini</h1>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">Gestione tavoli e conti in tempo reale</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-bordeaux text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-black transition-all"
        >
          {isAdding ? <Minus size={14} /> : <Plus size={14} />}
          {isAdding ? 'Chiudi' : 'Nuovo Ordine'}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden"
          >
            {/* Table Selection */}
            <div className="bg-white p-8 border border-ink/5 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-bordeaux underline">1. Seleziona un Tavolo</h3>
              <div className="grid grid-cols-3 gap-4">
                {tables.map(table => (
                  <button 
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`aspect-square flex flex-col items-center justify-center border transition-all ${
                      selectedTable?.id === table.id ? 'bg-bordeaux text-white border-bordeaux' : 'bg-beige/30 border-ink/5 text-ink hover:border-bordeaux'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest">T-{table.number}</span>
                    <User size={12} className="mt-1 opacity-40" />
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Selection */}
            <div className="bg-white p-8 border border-ink/5 shadow-sm">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-bordeaux underline">2. Aggiungi Articoli</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                {menuItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-[10px] text-ink/40 uppercase tracking-widest">{item.price}€</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="p-2 bg-ink/5 hover:bg-bordeaux hover:text-white transition-all rounded-full"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-ink text-white p-8 border border-ink/5 shadow-xl">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6 text-white/40 underline">3. Riepilogo</h3>
              {selectedTable ? (
                <div className="space-y-6 flex flex-col h-[350px]">
                  <div className="text-sm border-b border-white/10 pb-4">
                    Tavolo : <span className="text-bordeaux font-bold uppercase">T-{selectedTable.number}</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {cart.map(c => (
                      <div key={c.item.id} className="flex justify-between items-center text-xs">
                        <div className="flex-1">
                          <p>{c.item.name}</p>
                          <p className="text-white/40">{c.item.price}€ × {c.qty}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateCartQty(c.item.id, -1)} className="p-1 border border-white/10"><Minus size={10} /></button>
                          <span>{c.qty}</span>
                          <button onClick={() => updateCartQty(c.item.id, 1)} className="p-1 border border-white/10"><Plus size={10} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Totale</span>
                      <span className="font-serif text-2xl text-bordeaux">{cart.reduce((acc, i) => acc + i.item.price * i.qty, 0).toFixed(2)}€</span>
                    </div>
                    <button 
                      onClick={submitOrder}
                      disabled={cart.length === 0}
                      className="w-full py-4 bg-bordeaux text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-ink transition-all disabled:opacity-20"
                    >
                      Conferma Ordine
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-white/20 text-xs italic">
                  Per favore seleziona un tavolo
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orders List */}
      <div className="space-y-8">
        <h2 className="font-serif text-2xl text-ink font-light italic border-b border-ink/5 pb-4">Ordini in Corso</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-2 border-bordeaux border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.filter(o => o.status === 'pending').map(order => (
              <motion.div 
                key={order.id}
                layout
                className="bg-white border border-ink/5 p-8 shadow-sm flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-bordeaux bg-bordeaux/5 px-2 py-1 rounded">Tavolo {order.tableNumber}</span>
                    <p className="text-[9px] text-ink/30 uppercase tracking-widest mt-2">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                  <Clock size={16} className="text-ink/20" />
                </div>

                <div className="flex-1 space-y-3 mb-8">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-light">
                      <span>{item.quantity} × {item.name}</span>
                      <span className="text-ink/40">{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-ink/5">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Totale dovuto</span>
                    <span className="font-serif text-2xl text-ink">{order.totalAmount.toFixed(2)}€</span>
                  </div>
                  <button 
                    onClick={() => markAsPaid(order.id)}
                    className="w-full py-4 border border-bordeaux text-bordeaux text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-bordeaux hover:text-white transition-all flex items-center justify-center gap-3"
                  >
                    <CheckCircle size={14} />
                    Salda il conto
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
