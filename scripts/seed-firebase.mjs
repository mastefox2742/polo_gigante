/**
 * Seed script — populates Firestore with demo menuItems and tables.
 * Usage: node scripts/seed-firebase.mjs
 * Requires: .env file at project root with VITE_FIREBASE_* vars
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse .env manually (avoid needing dotenv as a dep at script level)
function loadEnv() {
  const envPath = resolve(__dirname, '..', '.env');
  const lines = readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    env[key] = value;
  }
  return env;
}

const env = loadEnv();

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_DATABASE_ID,
} = env;

if (!VITE_FIREBASE_PROJECT_ID || !VITE_FIREBASE_DATABASE_ID) {
  console.error('Missing required env vars. Check your .env file.');
  process.exit(1);
}

// Dynamic import of firebase to use ESM
const { initializeApp } = await import('firebase/app');
const { getFirestore, collection, addDoc, getDocs, writeBatch, doc } = await import('firebase/firestore');

const app = initializeApp({
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app, VITE_FIREBASE_DATABASE_ID);

const MENU_ITEMS = [
  { name: 'Burrata Cremosa', description: 'Burrata pugliese, pomodori heritage, olio al basilico.', price: 16, category: 'Antipasti', isActive: true, image: 'https://images.unsplash.com/photo-1633040319468-7a300b7bc19a?auto=format&fit=crop&q=80&w=800' },
  { name: 'Carpaccio di Manzo', description: 'Manzo Charolais, scaglie di tartufo, rucola selvatica.', price: 18, category: 'Antipasti', isActive: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800' },
  { name: 'Risotto ai Funghi Porcini', description: 'Riso Carnaroli, funghi selvatici, parmigiano 24 mesi.', price: 24, category: 'Primi', isActive: true, image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tagliatelle al Ragù', description: 'Pasta fresca, ragù di manzo cotto lentamente.', price: 20, category: 'Primi', isActive: true, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&q=80&w=800' },
  { name: 'Branzino Arrosto', description: 'Branzino fresco, verdure grigliate, emulsione al limone.', price: 32, category: 'Secondi', isActive: true, image: 'https://images.unsplash.com/photo-1551144402-f8975a61d79d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Filetto di Manzo', description: 'Cuore di filetto, riduzione al vino rosso, purea di patate.', price: 38, category: 'Secondi', isActive: true, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800' },
  { name: 'Tiramisù Signature', description: 'Mascarpone cremoso, caffè arabica, cacao amaro.', price: 12, category: 'Dolci', isActive: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800' },
  { name: 'Panna Cotta al Cocco', description: 'Coulis di mango fresco e lime.', price: 10, category: 'Dolci', isActive: true, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800' },
  { name: 'Negroni Classico', description: 'Gin, Campari, Vermouth rosso, scorza d\'arancia.', price: 14, category: 'Bevande', isActive: true, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' },
  { name: 'Acqua Minerale', description: 'Naturale o frizzante, 75cl.', price: 4, category: 'Bevande', isActive: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800' },
];

const TABLES = [
  { number: '01', capacity: 2, isActive: true },
  { number: '02', capacity: 2, isActive: true },
  { number: '03', capacity: 4, isActive: true },
  { number: '04', capacity: 4, isActive: true },
  { number: '05', capacity: 6, isActive: true },
  { number: '06', capacity: 8, isActive: true },
];

async function collectionIsEmpty(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.empty;
}

async function seedCollection(collectionName, items) {
  const isEmpty = await collectionIsEmpty(collectionName);
  if (!isEmpty) {
    console.log(`  [SKIP] ${collectionName} already has data, skipping seed.`);
    return;
  }
  const batch = writeBatch(db);
  items.forEach((item) => {
    const ref = doc(collection(db, collectionName));
    batch.set(ref, item);
  });
  await batch.commit();
  console.log(`  [OK]   ${collectionName}: inserted ${items.length} documents.`);
}

console.log(`\nSeeding Firestore database: ${VITE_FIREBASE_DATABASE_ID}`);
console.log(`Project: ${VITE_FIREBASE_PROJECT_ID}\n`);

try {
  await seedCollection('menuItems', MENU_ITEMS);
  await seedCollection('tables', TABLES);
  console.log('\nDone! Refresh your site to see the data.\n');
  process.exit(0);
} catch (err) {
  console.error('\nSeed failed:', err.message);
  console.error('Full error:', err);
  process.exit(1);
}
