import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Review } from '../../types';
import { Star, Trash2, ExternalLink } from 'lucide-react';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() } as Review)));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questa recensione?')) return;
    await deleteDoc(doc(db, 'reviews', id));
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'text-bordeaux fill-bordeaux' : 'text-ink/20'}
      />
    ));

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl text-ink font-light">Recensioni</h1>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">
            Gestione Feedback Clienti
          </p>
        </div>
        <a
          href="https://search.google.com/local/reviews?placeid=YOUR_PLACE_ID"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-ink/10 text-[10px] uppercase tracking-widest font-bold hover:bg-ink hover:text-white transition-all"
        >
          <ExternalLink size={14} />
          Vedi su Google Maps
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: 'Totale Recensioni', value: reviews.length },
          { label: 'Media Voti', value: avgRating },
          { label: '5 Stelle', value: reviews.filter(r => r.rating === 5).length },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 border border-ink/5 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest font-bold text-ink/40 mb-1">{s.label}</p>
            <p className="text-3xl font-serif text-bordeaux">{s.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-bordeaux border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-ink/30 italic">Nessuna recensione ancora.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="bg-white border border-ink/5 shadow-sm p-6 flex justify-between gap-6">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm text-ink">{r.name}</span>
                  <div className="flex">{renderStars(r.rating)}</div>
                  <span className="text-[10px] text-ink/30 ml-auto">
                    {new Date(r.createdAt).toLocaleDateString('it-IT')}
                  </span>
                </div>
                <p className="text-sm text-ink/60 leading-relaxed">{r.comment}</p>
              </div>
              <button
                onClick={() => handleDelete(r.id)}
                className="text-ink/20 hover:text-bordeaux transition-colors self-start mt-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
