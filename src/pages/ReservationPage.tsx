import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'reservations'), {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: Number(formData.guests),
        date: formData.date,
        notes: formData.notes || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'reservations');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-beige/98 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 text-center shadow-xl border border-bordeaux/10"
        >
          <CheckCircle2 size={64} className="text-bordeaux mx-auto mb-8" strokeWidth={1} />
          <h2 className="font-serif text-3xl text-ink mb-4">Prenotazione Ricevuta</h2>
          <p className="text-ink/60 font-light mb-8 italic">
            Grazie {formData.name}, abbiamo ricevuto la tua richiesta. Un'email di conferma ti sarà inviata a breve.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-bordeaux border-b border-bordeaux pb-1"
          >
            Torna alla Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 bg-white/95 min-h-screen my-6 border-y border-white/10">
      <div className="max-w-2xl mx-auto bg-white p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-10">
          <span className="text-bordeaux text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Prenotazioni</span>
          <h1 className="font-serif text-5xl md:text-7xl text-ink mb-8 font-light italic">Prenota il tuo Tavolo</h1>
          <p className="text-ink/50 text-lg font-light">
            Un'esperienza culinaria d'eccellenza ti aspetta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-2xl border border-ink/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Nome Completo</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-ink/10 text-ink pb-3 text-sm focus:outline-none focus:border-bordeaux transition-colors"
                placeholder="Marco Rossi"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Ospiti</label>
              <input
                required
                type="number"
                min="1"
                max="20"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                className="w-full bg-transparent border-b border-ink/10 text-ink pb-3 text-sm focus:outline-none focus:border-bordeaux transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Email</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-ink/10 text-ink pb-3 text-sm focus:outline-none focus:border-bordeaux transition-colors" 
                placeholder="marco@example.com" 
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Telefono</label>
              <input 
                required
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-transparent border-b border-ink/10 text-ink pb-3 text-sm focus:outline-none focus:border-bordeaux transition-colors" 
                placeholder="+39 06 ..." 
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Data & Ora</label>
            <input 
              required
              type="datetime-local" 
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full bg-transparent border-b border-ink/10 text-ink pb-3 text-sm focus:outline-none focus:border-bordeaux transition-colors" 
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Richieste Particolari</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full bg-transparent border-b border-ink/10 text-ink pb-3 text-sm focus:outline-none focus:border-bordeaux transition-colors resize-none" 
              rows={2} 
              placeholder="Allergie, compleanni..."
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-bordeaux text-white text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-black transition-all duration-700 shadow-xl disabled:opacity-50"
          >
            {loading ? 'Invio in corso...' : 'Prenota un Tavolo'}
          </button>
        </form>
      </div>
    </div>
  );
}
