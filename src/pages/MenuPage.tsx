import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const CATEGORIES = ['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande'] as const;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('Antipasti');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const q = query(collection(db, 'menuItems'), where('isActive', '==', true));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
        setItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="py-60 bg-white/95 min-h-screen my-20 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 bg-white p-12 border border-white/20 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-ink/5 pb-10">
          <div>
            <h2 className="font-serif text-5xl text-bordeaux font-light">Il Menu</h2>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mt-2 font-bold">Selezione Gastronomica • Polo Gigante</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] py-2 whitespace-nowrap transition-all ${
                  activeCategory === cat 
                  ? 'text-bordeaux font-bold border-b border-bordeaux' 
                  : 'text-ink/30 border-b border-transparent hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-10 h-10 border-2 border-bordeaux border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <p className="font-serif text-2xl text-ink/30 mb-4 italic">Il nostro nuovo menu arriverà presto...</p>
            <div className="w-12 h-[1px] bg-ink/10"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            <AnimatePresence mode="wait">
              {items.filter(item => item.category === activeCategory).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="group flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden mb-6 bg-beige/50">
                    <img 
                      src={item.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&sig=${item.id}`} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-xl font-medium text-ink group-hover:text-bordeaux transition-colors">{item.name}</h4>
                    <span className="text-sm serif text-bordeaux font-semibold">{item.price}€</span>
                  </div>
                  <p className="text-ink/50 text-xs font-normal leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
