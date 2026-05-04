import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem } from '../types';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, 'menuItems'), 
          where('isActive', '==', true),
          limit(3)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setFeaturedItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem)));
        } else {
          setFeaturedItems([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden" ref={heroRef}>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 bg-black/20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1 className="text-white font-serif text-8xl md:text-9xl mb-4 font-light tracking-tight">
              Pollo Gigante
            </h1>
            <p className="text-white/80 italic serif text-2xl tracking-wide mb-12">Sapori del Senegal e Cucina Creativa</p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Link 
                to="/reservations"
                className="px-8 py-4 bg-white text-ink text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-bordeaux hover:text-white transition-all duration-500"
              >
                Prenota un Tavolo
              </Link>
            </div>
          </motion.div>
          
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-60 px-6 bg-[#FDFDF7]/95 border-y border-ink/5 my-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-bordeaux text-[10px] uppercase tracking-[0.4em] font-bold mb-12 block">Est. 1994 • Pontedera</span>
          <h3 className="font-serif text-4xl md:text-6xl text-ink leading-[1.1] mb-12 font-light italic">
            Un viaggio di sapori tra tradizione e creatività.
          </h3>
          <p className="text-ink/60 leading-relaxed font-normal text-xl max-w-2xl mx-auto">
            Situato nel cuore di Pontedera in Via Roma 11, Pollo Gigante è un ode ai sapori autentici, 
            dove ogni piatto racconta una storia di passione e convivialità.
          </p>
        </div>
      </section>

      {/* Featured Dishes Section */}
      {featuredItems.length > 0 && (
        <section className="py-40 bg-white/95 mb-20 border-y border-ink/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl text-ink font-light italic">I Nostri Classici</h2>
              <div className="w-20 h-px bg-bordeaux mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {featuredItems.map((dish, idx) => (
                <motion.div 
                  key={dish.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/5] overflow-hidden mb-6 bg-beige">
                    <img 
                      src={dish.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'} 
                      alt={dish.name} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <h4 className="font-serif text-2xl text-ink mb-1">{dish.name}</h4>
                  <p className="text-bordeaux font-bold text-sm tracking-widest">{dish.price}€</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link to="/menu" className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink border-b border-ink/20 pb-2 hover:text-bordeaux hover:border-bordeaux transition-all">
                Consulta il Menu completo
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
