import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, limit, getDocs, addDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem, Review } from '../types';
import { Star, ExternalLink } from 'lucide-react';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, 'menuItems'), where('isActive', '==', true), limit(3));
        const snapshot = await getDocs(q);
        setFeaturedItems(snapshot.empty ? [] : snapshot.docs.map(d => ({ id: d.id, ...d.data() } as MenuItem)));
      } catch (err) {
        console.error(err);
      }
    };
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(6));
        const snapshot = await getDocs(q);
        setReviews(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Review)));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;
    setReviewLoading(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        name: reviewForm.name.trim(),
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
        createdAt: new Date().toISOString(),
      });
      setReviewSubmitted(true);
      setReviewForm({ name: '', rating: 5, comment: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setReviewLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (v: number) => void) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={interactive ? 24 : 14}
        className={`${i < rating ? 'text-bordeaux fill-bordeaux' : 'text-white/30'} ${interactive ? 'cursor-pointer transition-colors' : ''}`}
        onClick={() => interactive && onChange?.(i + 1)}
      />
    ));

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
      <section className="py-20 px-6 bg-[#FDFDF7]/95 border-y border-ink/5 my-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-bordeaux text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Est. 1994 • Pontedera</span>
          <h3 className="font-serif text-4xl md:text-6xl text-ink leading-[1.1] mb-6 font-light italic">
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
        <section className="py-16 bg-white/95 mb-6 border-y border-ink/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
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

            <div className="mt-10 text-center">
              <Link to="/menu" className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink border-b border-ink/20 pb-2 hover:text-bordeaux hover:border-bordeaux transition-all">
                Consulta il Menu completo
              </Link>
            </div>
          </div>
        </section>
      )}
      {/* Reviews Section */}
      <section className="py-16 px-6 bg-ink my-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-bordeaux text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Cosa dicono di noi</span>
            <h2 className="font-serif text-5xl text-white font-light italic">Recensioni</h2>
            <div className="w-20 h-px bg-bordeaux mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-8">Lascia la tua Recensione</h3>
              {reviewSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={20} className="text-bordeaux fill-bordeaux" />
                    ))}
                  </div>
                  <p className="font-serif text-2xl text-white italic">Grazie per il tuo feedback!</p>
                  <button
                    onClick={() => setReviewSubmitted(false)}
                    className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                  >
                    Scrivi un'altra recensione
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Il tuo nome"
                    value={reviewForm.name}
                    onChange={e => setReviewForm(p => ({ ...p, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bordeaux transition-colors"
                  />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">Valutazione</p>
                    <div className="flex gap-2">
                      {renderStars(reviewForm.rating, true, v => setReviewForm(p => ({ ...p, rating: v })))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Racconta la tua esperienza..."
                    value={reviewForm.comment}
                    onChange={e => setReviewForm(p => ({ ...p, comment: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-bordeaux transition-colors resize-none"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={reviewLoading}
                      className="flex-1 py-4 bg-bordeaux text-white text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-ink transition-all disabled:opacity-50"
                    >
                      {reviewLoading ? 'Invio...' : 'Invia Recensione'}
                    </button>
                    <a
                      href="https://www.google.com/maps/search/Pollo+Gigante+Pontedera+Via+Roma+11"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-4 border border-white/20 text-white/60 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-all"
                    >
                      <ExternalLink size={14} />
                      Google Maps
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Reviews list */}
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-8">Ultime Recensioni</h3>
              {reviews.length === 0 ? (
                <p className="font-serif text-xl text-white/30 italic">Sii il primo a recensirci!</p>
              ) : (
                reviews.slice(0, 4).map(r => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 pb-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white text-sm">{r.name}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} size={12} className={i < r.rating ? 'text-bordeaux fill-bordeaux' : 'text-white/20'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{r.comment}</p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
