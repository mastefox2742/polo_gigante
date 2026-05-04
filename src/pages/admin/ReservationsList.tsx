import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Reservation } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore-utils';
import { Check, X, Phone, Mail, Calendar, Users, Trash2 } from 'lucide-react';

export default function AdminReservationsList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'reservations'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation)));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'reservations'));
    return unsubscribe;
  }, []);

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `reservations/${id}`);
    }
  };

  const deleteReservation = async (id: string) => {
    if (!confirm('Eliminare questa prenotazione?')) return;
    try {
      await deleteDoc(doc(db, 'reservations', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `reservations/${id}`);
    }
  };
  const statusMap: Record<string, string> = {
    pending: 'In attesa',
    confirmed: 'Confermata',
    cancelled: 'Annullata'
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-serif text-4xl text-ink font-light">Prenotazioni Clienti</h1>
        <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">Gestione delle richieste di prenotazione online</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-2 border-bordeaux border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white border border-ink/5 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-beige/30 border-b border-ink/5">
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-ink/40 font-bold">Data e Ora</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-ink/40 font-bold">Cliente</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-ink/40 font-bold">Ospiti</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-ink/40 font-bold">Stato</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-ink/40 font-bold text-right">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {reservations.map(res => (
                <tr key={res.id} className="hover:bg-beige/10 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-sm font-medium">{new Date(res.date).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                    <p className="text-[10px] text-ink/30 uppercase tracking-widest mt-1">{new Date(res.date).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-medium">{res.customerName}</p>
                    <div className="flex gap-4 mt-2">
                      <a href={`tel:${res.phone}`} className="text-ink/30 hover:text-bordeaux transition-colors"><Phone size={12} /></a>
                      <a href={`mailto:${res.email}`} className="text-ink/30 hover:text-bordeaux transition-colors"><Mail size={12} /></a>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-medium">{res.guests}</p>
                    <p className="text-[10px] text-ink/30 uppercase tracking-widest">Persone</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                      res.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      res.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {statusMap[res.status] || res.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {res.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(res.id, 'confirmed')} className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded transition-all"><Check size={14} /></button>
                          <button onClick={() => updateStatus(res.id, 'cancelled')} className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded transition-all"><X size={14} /></button>
                        </>
                      )}
                      <button onClick={() => deleteReservation(res.id)} className="p-2 bg-ink/5 text-ink/40 hover:bg-ink hover:text-white rounded transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-ink/30 italic text-sm font-light">Nessuna prenotazione al momento.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
