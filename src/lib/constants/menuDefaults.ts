import { MenuItem } from '../../types';

export const DEFAULT_MENU_ITEMS: Omit<MenuItem, 'id'>[] = [
  { name: 'Burrata Cremosa', description: 'Burrata pugliese, pomodori heritage, olio al basilico.', price: 16, category: 'Antipasti', isActive: true, image: 'https://images.unsplash.com/photo-1633040319468-7a300b7bc19a?auto=format&fit=crop&q=80&w=800' },
  { name: 'Carpaccio di Manzo', description: 'Manzo Charolais, scaglie di tartufo, rucola.', price: 18, category: 'Antipasti', isActive: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800' },
  { name: 'Risotto ai Funghi Porcini', description: 'Riso Carnaroli, funghi selvatici, parmigiano 24 mesi.', price: 24, category: 'Primi', isActive: true, image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800' },
  { name: 'Branzino Arrosto', description: 'Branzino fresco, verdure grigliate, emulsione al limone.', price: 32, category: 'Secondi', isActive: true, image: 'https://images.unsplash.com/photo-1551144402-f8975a61d79d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Filetto di Manzo Rosso', description: 'Cuore di filetto, riduzione di bordeaux, purea Robuchon.', price: 38, category: 'Secondi', isActive: true, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tiramisù Signature', description: 'Mascarpone cremoso, caffè arabica, cacao amaro.', price: 12, category: 'Dolci', isActive: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800' },
  { name: 'Panna Cotta al Cocco', description: 'Coulis di mango fresco e lime.', price: 10, category: 'Dolci', isActive: true, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800' },
  { name: 'Negroni Classico', description: 'Gin, Campari, Vermouth rosso, arancia.', price: 14, category: 'Bevande', isActive: true, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' },
  { name: 'Château Margaux 2015', description: 'Calice di grand cru classé Bordeaux.', price: 22, category: 'Bevande', isActive: true, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800' },
];
