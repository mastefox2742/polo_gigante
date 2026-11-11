# 🍗 Pollo Gigante — Site web du restaurant

Restaurant sénégalais & saveurs d'Italie. Site complet construit avec **Next.js 16**,
**React 19** et **Tailwind CSS v4**.

Design personnel inspiré des références *Ristorante* (hero sombre et élégant) et
*Foodly* (mise en avant des plats, chaleur), adapté à l'identité Sénégal × Italie.

## ✨ Fonctionnalités

- **Accueil** : hero plein écran, histoire, 3 univers de cuisine, plats populaires, galerie, avis, appels à réserver.
- **Menu dynamique** : carte complète par catégories (modifiable dans un seul fichier), navigation collante par section.
- **Galerie** : grille d'images façon mosaïque avec visionneuse (lightbox, clavier ← → Échap).
- **Contact** : adresse, horaires, carte Google Maps, réseaux sociaux.
- **Réservation en ligne** : formulaire complet → enregistré côté serveur (API).

## 🚀 Lancer le site

```bash
npm install     # (déjà fait)
npm run dev      # développement → http://localhost:3000
npm run build    # build de production
npm run start    # lancer le build de production
```

## 🎨 Tout personnaliser

| Quoi | Où |
|------|-----|
| Nom, téléphone, e-mail, adresse, horaires, réseaux, devise | `lib/site.ts` |
| Le menu (plats, prix, descriptions, catégories) | `lib/menu.ts` |
| Les photos (remplacer par les vraies) | `lib/images.ts` |
| Couleurs & polices | `app/globals.css` (section `@theme`) |
| Carte Google Maps | `lib/site.ts` → `mapsEmbed` |

### Remplacer les photos par les vôtres
1. Placez vos images dans le dossier `public/` (ex : `public/photos/poulet.jpg`).
2. Dans `lib/images.ts`, remplacez la valeur par le chemin, ex :
   `pouletBraise: "/photos/poulet.jpg"` et adaptez la fonction si besoin.

Les images actuelles viennent d'Unsplash (gratuites) — pensez à mettre les vraies
photos du restaurant avant la mise en ligne.

## 📥 Les réservations

Les demandes sont enregistrées dans `data/reservations.json` (ignoré par git).
Pour la **production sur Vercel**, le système de fichiers n'est pas persistant :
branchez une vraie base de données (Neon Postgres, Upstash Redis…) ou un envoi
d'e-mail (Resend) en modifiant `lib/reservations.ts` et `app/api/reservations/route.ts`.
On peut aussi ajouter l'envoi d'un e-mail/WhatsApp de confirmation (voir les
commentaires dans `app/api/reservations/route.ts`).

## 🧱 Structure

```
app/
  page.tsx            Accueil
  menu/page.tsx       Menu
  galerie/page.tsx    Galerie
  contact/page.tsx    Contact
  reservation/page.tsx  Réservation
  api/reservations/   API d'enregistrement
components/            Header, Footer, Hero, cartes, formulaire…
lib/                   site.ts, menu.ts, images.ts, reservations.ts
```
