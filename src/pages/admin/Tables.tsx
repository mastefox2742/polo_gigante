import { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, updateDoc, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Table } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore-utils';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function AdminTables() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTable, setNewTable] = useState({ number: '', capacity: 2 });

  useEffect(() => {
    const q = query(collection(db, 'tables'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTables(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Table)).sort((a, b) => Number(a.number) - Number(b.number)));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'tables'));
    return unsubscribe;
  }, []);

  const addTable = async () => {
    if (!newTable.number) return;
    try {
      await addDoc(collection(db, 'tables'), {
        number: newTable.number,
        capacity: Number(newTable.capacity),
        isActive: true
      });
      setIsAdding(false);
      setNewTable({ number: '', capacity: 2 });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'tables');
    }
  };

  const toggleTableStatus = async (table: Table) => {
    try {
      await updateDoc(doc(db, 'tables', table.id), {
        isActive: !table.isActive
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `tables/${table.id}`);
    }
  };

  const deleteTable = async (id: string) => {
    if (!confirm('Eliminare questo tavolo?')) return;
    try {
      await deleteDoc(doc(db, 'tables', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `tables/${id}`);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl text-ink font-light">Pianta della Sala</h1>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">Gestione tavoli e disponibilità</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-bordeaux text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-black transition-all"
        >
          {isAdding ? <X size={14} /> : <Plus size={14} />}
          {isAdding ? 'Annulla' : 'Aggiungi Tavolo'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 border border-ink/5 flex items-center gap-8 shadow-sm">
          <div className="space-y-2 flex-1">
            <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Numero</label>
            <input 
              type="text" 
              value={newTable.number}
              onChange={(e) => setNewTable({...newTable, number: e.target.value})}
              className="w-full bg-transparent border-b border-ink/10 text-ink pb-2 text-sm focus:outline-none focus:border-bordeaux" 
              placeholder="Es: 01"
            />
          </div>
          <div className="space-y-2 flex-1">
            <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Capacità</label>
            <input 
              type="number" 
              value={newTable.capacity}
              onChange={(e) => setNewTable({...newTable, capacity: Number(e.target.value)})}
              className="w-full bg-transparent border-b border-ink/10 text-ink pb-2 text-sm focus:outline-none focus:border-bordeaux" 
            />
          </div>
          <button 
            onClick={addTable}
            className="self-end px-12 py-3 bg-bordeaux text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all"
          >
            Conferma
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-2 border-bordeaux border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {tables.map(table => (
            <div key={table.id} className={`p-6 border transition-all ${table.isActive ? 'bg-white border-ink/5' : 'bg-ink/[0.02] border-ink/5 opacity-50'}`}>
              <div className="flex justify-between items-start mb-6">
                <span className="font-serif text-3xl text-ink font-light italic">T-{table.number}</span>
                <div className="flex gap-2">
                  <button onClick={() => toggleTableStatus(table)} className="text-ink/20 hover:text-bordeaux"><Check size={14} /></button>
                  <button onClick={() => deleteTable(table.id)} className="text-ink/20 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">Capacità</p>
                <p className="text-sm font-medium">{table.capacity} Persone</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
