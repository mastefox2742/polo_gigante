import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { randomUUID } from "node:crypto";

// Stockage simple des réservations dans un fichier JSON local.
// Parfait pour démarrer et pour le développement.
// Pour la production (Vercel), branche une base de données (Neon, Upstash…)
// en remplaçant saveReservation / getReservations ci-dessous.

export type ReservationInput = {
  name: string;
  email: string;
  phone: string;
  date: string; // AAAA-MM-JJ
  time: string; // HH:MM
  guests: number;
  occasion?: string;
  note?: string;
};

export type Reservation = ReservationInput & {
  id: string;
  createdAt: string;
  status: "pending";
};

// En local on écrit dans ./data. En production (Vercel) le dossier du projet
// est en lecture seule : on se rabat alors sur le dossier temporaire (/tmp)
// pour ne jamais renvoyer d'erreur au visiteur. ATTENTION : ce stockage de
// secours n'est pas durable → branche une vraie base de données pour la prod.
const PRIMARY_DIR = path.join(process.cwd(), "data");
const FALLBACK_DIR = path.join(os.tmpdir(), "pollo-gigante");

async function writableFile(): Promise<string> {
  for (const dir of [PRIMARY_DIR, FALLBACK_DIR]) {
    try {
      await fs.mkdir(dir, { recursive: true });
      return path.join(dir, "reservations.json");
    } catch {
      // on essaie le dossier suivant
    }
  }
  return path.join(FALLBACK_DIR, "reservations.json");
}

async function readAll(file: string): Promise<Reservation[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Reservation[];
  } catch {
    return [];
  }
}

export async function saveReservation(
  input: ReservationInput
): Promise<Reservation> {
  const reservation: Reservation = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  const file = await writableFile();
  const all = await readAll(file);
  all.push(reservation);
  // Log serveur : visible dans les logs Vercel même sans base de données.
  console.log("Nouvelle réservation:", JSON.stringify(reservation));
  await fs.writeFile(file, JSON.stringify(all, null, 2), "utf8");
  return reservation;
}

export async function getReservations(): Promise<Reservation[]> {
  return readAll(await writableFile());
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(body: unknown): {
  ok: boolean;
  errors: string[];
  value?: ReservationInput;
} {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const phone = String(b.phone ?? "").trim();
  const date = String(b.date ?? "").trim();
  const time = String(b.time ?? "").trim();
  const guests = Number(b.guests);
  const occasion = String(b.occasion ?? "").trim();
  const note = String(b.note ?? "").trim();

  if (name.length < 2) errors.push("Le nom est requis.");
  if (!EMAIL_RE.test(email)) errors.push("E-mail invalide.");
  if (phone.length < 6) errors.push("Le téléphone est requis.");
  if (!date) errors.push("La date est requise.");
  if (!time) errors.push("L'heure est requise.");
  if (!Number.isFinite(guests) || guests < 1 || guests > 20)
    errors.push("Le nombre de convives doit être entre 1 et 20.");

  // Date non passée
  if (date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(`${date}T00:00:00`);
    if (Number.isNaN(d.getTime())) errors.push("Date invalide.");
    else if (d < today) errors.push("La date ne peut pas être dans le passé.");
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    errors: [],
    value: { name, email, phone, date, time, guests, occasion, note },
  };
}
