"use client";

import { useState, useEffect } from "react";
import { IconCheck, IconArrow } from "./Icons";

const TIME_SLOTS = [
  "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
  "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const OCCASIONS = [
  "Repas classique",
  "Anniversaire",
  "Dîner en amoureux",
  "Repas de famille",
  "Repas d'affaires",
  "Groupe / événement",
];

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-muted/60";
const label = "mb-1.5 block text-sm font-medium text-ink";

export default function ReservationForm() {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: OCCASIONS[0],
    note: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrors([]);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? ["Une erreur est survenue."]);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrors(["Connexion impossible. Réessayez."]);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center px-8 py-14 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-forest/15 text-forest">
          <IconCheck width={34} height={34} />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-ink">
          Demande envoyée !
        </h3>
        <p className="mt-3 max-w-sm text-muted">
          Merci {form.name.split(" ")[0]} ! Nous avons bien reçu votre demande
          de réservation pour <strong>{form.guests}</strong> personne(s) le{" "}
          <strong>{form.date}</strong> à <strong>{form.time}</strong>. Nous vous
          confirmons très vite par e-mail ou téléphone.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm((f) => ({ ...f, date: "", time: "", note: "" }));
          }}
          className="btn btn-outline mt-7 text-ink"
        >
          Nouvelle réservation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 md:p-9">
      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-terracotta/30 bg-terracotta/10 p-4 text-sm text-terracotta">
          <ul className="list-inside list-disc space-y-1">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="name">
            Nom complet *
          </label>
          <input
            id="name"
            className={field}
            value={form.name}
            onChange={update("name")}
            placeholder="Awa Diallo"
            required
          />
        </div>

        <div>
          <label className={label} htmlFor="email">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            className={field}
            value={form.email}
            onChange={update("email")}
            placeholder="awa@email.com"
            required
          />
        </div>

        <div>
          <label className={label} htmlFor="phone">
            Téléphone *
          </label>
          <input
            id="phone"
            type="tel"
            className={field}
            value={form.phone}
            onChange={update("phone")}
            placeholder="06 12 34 56 78"
            required
          />
        </div>

        <div>
          <label className={label} htmlFor="date">
            Date *
          </label>
          <input
            id="date"
            type="date"
            min={today}
            className={field}
            value={form.date}
            onChange={update("date")}
            required
          />
        </div>

        <div>
          <label className={label} htmlFor="time">
            Heure *
          </label>
          <select
            id="time"
            className={field}
            value={form.time}
            onChange={update("time")}
            required
          >
            <option value="">Choisir…</option>
            <optgroup label="Déjeuner">
              {TIME_SLOTS.slice(0, 6).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </optgroup>
            <optgroup label="Dîner">
              {TIME_SLOTS.slice(6).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="guests">
            Convives *
          </label>
          <select
            id="guests"
            className={field}
            value={form.guests}
            onChange={update("guests")}
            required
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? "personnes" : "personne"}
              </option>
            ))}
            <option value="13">Plus de 12 (groupe)</option>
          </select>
        </div>

        <div>
          <label className={label} htmlFor="occasion">
            Occasion
          </label>
          <select
            id="occasion"
            className={field}
            value={form.occasion}
            onChange={update("occasion")}
          >
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="note">
            Une demande particulière ?
          </label>
          <textarea
            id="note"
            rows={3}
            className={field}
            value={form.note}
            onChange={update("note")}
            placeholder="Allergie, chaise haute, table en terrasse…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-gold mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Envoi en cours…" : "Confirmer ma réservation"}
        {status !== "loading" && <IconArrow width={18} height={18} />}
      </button>
      <p className="mt-4 text-center text-xs text-muted">
        * Champs obligatoires. Votre demande est confirmée par notre équipe.
      </p>
    </form>
  );
}
