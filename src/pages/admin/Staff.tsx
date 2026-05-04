import React, { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-utils';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Shield, Trash2, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface StaffMember {
  email: string;
  role: 'admin' | 'staff';
  addedAt: string;
}

export default function AdminStaff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'staff'>('staff');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const q = query(collection(db, 'authorized_staff'), orderBy('addedAt', 'desc'));
      const snapshot = await getDocs(q);
      setStaff(snapshot.docs.map(doc => doc.data() as StaffMember));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'authorized_staff');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    try {
      const staffMember: StaffMember = {
        email: newEmail.toLowerCase().trim(),
        role: newRole,
        addedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'authorized_staff', staffMember.email), staffMember);
      setStaff([staffMember, ...staff]);
      setNewEmail('');
      setFeedback({ type: 'success', message: 'Staff aggiunto con successo' });
      setIsAdding(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'authorized_staff');
      setFeedback({ type: 'error', message: 'Errore durante l\'aggiunta dello staff' });
    }
  };

  const handleDeleteStaff = async (email: string) => {
    if (!confirm(`Rimuovere ${email} dallo staff?`)) return;

    try {
      await deleteDoc(doc(db, 'authorized_staff', email));
      setStaff(staff.filter(s => s.email !== email));
      setFeedback({ type: 'success', message: 'Staff rimosso con successo' });
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'authorized_staff');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <div className="w-10 h-10 border-2 border-bordeaux border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl text-ink font-light italic">Gestione Staff</h1>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">Autorizza il personale ad accedere al pannello</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-ink text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-bordeaux transition-all"
        >
          <UserPlus size={14} />
          Nuovo Staff
        </button>
      </div>

      {feedback && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 flex items-center gap-3 text-xs uppercase tracking-widest font-bold ${
            feedback.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {feedback.message}
        </motion.div>
      )}

      {/* Add Staff Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-12 max-w-md w-full shadow-2xl relative"
            >
              <h2 className="font-serif text-3xl mb-8 italic">Aggiungi Staff</h2>
              <form onSubmit={handleAddStaff} className="space-y-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-ink/40 mb-2">Email Google</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20" size={16} />
                    <input 
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="staff@gmail.com"
                      className="w-full pl-12 pr-4 py-4 bg-[#FDFDF7] border border-ink/5 focus:border-bordeaux outline-none text-sm transition-all"
                    />
                  </div>
                  <p className="text-[8px] text-ink/30 mt-2">Dovranno accedere con questo account Google.</p>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-ink/40 mb-2">Ruolo</label>
                  <select 
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as 'admin' | 'staff')}
                    className="w-full px-4 py-4 bg-[#FDFDF7] border border-ink/5 focus:border-bordeaux outline-none text-sm appearance-none"
                  >
                    <option value="staff">Staff (Limited)</option>
                    <option value="admin">Admin (Full Control)</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 px-6 py-4 border border-ink/10 text-[10px] uppercase tracking-widest font-bold hover:bg-ink/5 transition-all"
                  >
                    Annulla
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-4 bg-bordeaux text-white text-[10px] uppercase tracking-widest font-bold hover:bg-ink transition-all"
                  >
                    Autorizza
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-ink/5 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#FDFDF7] border-b border-ink/5">
              <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40">Staff</th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40">Ruolo</th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40">Data Aggiunta</th>
              <th className="px-8 py-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {staff.map((s) => (
              <tr key={s.email} className="hover:bg-[#FDFDF7]/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-bordeaux/5 flex items-center justify-center text-bordeaux">
                      <Mail size={16} />
                    </div>
                    <span className="text-sm font-medium">{s.email}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${
                    s.role === 'admin' ? 'text-bordeaux bg-bordeaux/5' : 'text-ink/40 bg-ink/5'
                  }`}>
                    <Shield size={12} />
                    {s.role}
                  </span>
                </td>
                <td className="px-8 py-6 text-xs text-ink/40">
                  {new Date(s.addedAt).toLocaleDateString('it-IT')}
                </td>
                <td className="px-8 py-6 text-right">
                  {s.email !== 'foxdev51@gmail.com' && (
                    <button 
                      onClick={() => handleDeleteStaff(s.email)}
                      className="p-2 text-ink/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center text-ink/30 italic text-sm">
                  Nessun membro dello staff autorizzato trovato.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
