import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { MenuItem } from '../../types';
import { handleFirestoreError, OperationType } from '../../lib/firestore-utils';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Check, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEFAULT_MENU_ITEMS } from '../../lib/constants/menuDefaults';

const CATEGORIES = ['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande'] as const;

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'menuItems'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem)));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'menuItems'));
    return unsubscribe;
  }, []);

  const seedDefaults = async () => {
    if (!confirm('Vuoi importare i piatti dimostrativi? Questo aggiungerà i piatti predefiniti al database.')) return;
    setIsSeeding(true);
    try {
      const batch = writeBatch(db);
      DEFAULT_MENU_ITEMS.forEach((item) => {
        const newDocRef = doc(collection(db, 'menuItems'));
        // Clean data for strict validation
        const cleanedItem = {
          name: (item.name || 'Senza titolo').substring(0, 100),
          description: (item.description || '').substring(0, 1000),
          price: Number(item.price) || 0,
          category: item.category || 'Secondi',
          isActive: true,
          image: item.image || ''
        };
        batch.set(newDocRef, cleanedItem);
      });
      await batch.commit();
      setIsSeeding(false);
      setTimeout(() => alert('Menu dimostrativo importato con successo!'), 100);
    } catch (err) {
      console.error("Errore d'importazione :", err);
      handleFirestoreError(err, OperationType.WRITE, 'menuItems');
      setIsSeeding(false);
    }
  };

  const saveItem = async () => {
    if (!editingItem?.name || !editingItem?.price || !editingItem?.category) return;

    try {
      if (editingItem.id) {
        await updateDoc(doc(db, 'menuItems', editingItem.id), {
          ...editingItem,
          price: Number(editingItem.price),
          isActive: editingItem.isActive ?? true
        });
      } else {
        await addDoc(collection(db, 'menuItems'), {
          ...editingItem,
          price: Number(editingItem.price),
          isActive: true,
          image: editingItem.image || ''
        });
      }
      setIsEditing(false);
      setEditingItem(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'menuItems');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Eliminare questo piatto?')) return;
    try {
      await deleteDoc(doc(db, 'menuItems', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `menuItems/${id}`);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl text-ink font-light">Gestione Menu</h1>
          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-1">Modifica piatti, prezzi e immagini</p>
        </div>
        <div className="flex gap-4">
          {!loading && (
            <button 
              onClick={seedDefaults}
              disabled={isSeeding}
              className="border border-ink/10 text-ink/60 px-8 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-beige transition-all disabled:opacity-50"
            >
              <Database size={14} />
              {isSeeding ? 'Inizializzazione...' : 'Importa Predefiniti'}
            </button>
          )}
          <button 
            onClick={() => {
              setEditingItem({ name: '', price: 0, category: 'Primi', description: '', isActive: true });
              setIsEditing(true);
            }}
            className="bg-bordeaux text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-black transition-all"
          >
            <Plus size={14} />
            Aggiungi Piatto
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white p-8 border border-ink/5 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <div className="space-y-6">
              <div className="aspect-video bg-beige/50 border border-dashed border-ink/10 flex flex-col items-center justify-center relative overflow-hidden group">
                {editingItem?.image ? (
                  <>
                    <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-[10px] uppercase tracking-widest font-bold">Cambia immagine</p>
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon size={32} className="text-ink/10 mb-2" />
                    <p className="text-[10px] text-ink/30 uppercase tracking-widest font-bold">Nessuna immagine</p>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement('canvas');
                          const MAX_WIDTH = 800;
                          const MAX_HEIGHT = 600;
                          let width = img.width;
                          let height = img.height;

                          if (width > height) {
                            if (width > MAX_WIDTH) {
                              height *= MAX_WIDTH / width;
                              width = MAX_WIDTH;
                            }
                          } else {
                            if (height > MAX_HEIGHT) {
                              width *= MAX_HEIGHT / height;
                              height = MAX_HEIGHT;
                            }
                          }

                          canvas.width = width;
                          canvas.height = height;
                          const ctx = canvas.getContext('2d');
                          ctx?.drawImage(img, 0, 0, width, height);
                          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                          setEditingItem(prev => ({ ...prev, image: dataUrl }));
                        };
                        img.src = event.target?.result as string;
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[9px] text-ink/40 leading-tight italic">
                Ottimizzazione automatica per mobile e web. Le foto ad alta qualità vengono compresse per prestazioni ottimali.
              </p>
            </div>

            <div className="space-y-6 md:col-span-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Nome del Piatto</label>
                  <input 
                    type="text" 
                    value={editingItem?.name}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, name: e.target.value }))}
                    className="w-full bg-transparent border-b border-ink/10 text-ink pb-2 text-sm focus:outline-none focus:border-bordeaux"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Prezzo (€)</label>
                  <input 
                    type="number" 
                    value={editingItem?.price}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, price: Number(e.target.value) }))}
                    className="w-full bg-transparent border-b border-ink/10 text-ink pb-2 text-sm focus:outline-none focus:border-bordeaux"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Categoria</label>
                  <select 
                    value={editingItem?.category}
                    onChange={(e) => setEditingItem(prev => ({ ...prev!, category: e.target.value as any }))}
                    className="w-full bg-transparent border-b border-ink/10 text-ink pb-2 text-sm focus:outline-none focus:border-bordeaux appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2 flex items-end pb-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={editingItem?.isActive}
                      onChange={(e) => setEditingItem(prev => ({ ...prev!, isActive: e.target.checked }))}
                      className="accent-bordeaux"
                    />
                    <span className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Disponibile</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-ink/40 uppercase tracking-widest font-bold">Descrizione</label>
                <textarea 
                  value={editingItem?.description}
                  onChange={(e) => setEditingItem(prev => ({ ...prev!, description: e.target.value }))}
                  className="w-full bg-transparent border-b border-ink/10 text-ink pb-2 text-sm focus:outline-none focus:border-bordeaux resize-none"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button 
                  onClick={() => { setIsEditing(false); setEditingItem(null); }}
                  className="px-8 py-3 text-[10px] uppercase tracking-widest font-bold text-ink/40 hover:text-ink transition-colors"
                >
                  Annulla
                </button>
                <button 
                  onClick={saveItem}
                  className="px-12 py-3 bg-bordeaux text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all"
                >
                  Salva
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => (
          <div key={item.id} className="bg-white border border-ink/5 p-6 shadow-sm group">
            <div className="aspect-video mb-6 bg-beige/30 overflow-hidden">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-10">
                  <ImageIcon size={48} />
                </div>
              )}
            </div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-serif text-xl font-medium text-ink">{item.name}</h4>
              <span className="text-bordeaux font-bold text-sm tracking-widest">{item.price}€</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink/30 mb-4">{item.category} • {item.isActive ? 'Disponibile' : 'Non Disponibile'}</p>
            <p className="text-ink/60 text-xs font-light line-clamp-2 mb-6">{item.description}</p>
            
            <div className="flex gap-4 pt-6 border-t border-ink/5">
              <button 
                onClick={() => { setEditingItem(item); setIsEditing(true); }}
                className="flex-1 py-2 border border-ink/10 text-ink/40 text-[9px] uppercase tracking-widest font-bold hover:bg-ink hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Edit2 size={12} /> Modifica
              </button>
              <button 
                onClick={() => deleteItem(item.id)}
                className="p-2 border border-ink/10 text-ink/20 hover:text-red-500 hover:border-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
