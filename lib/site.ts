// =========================================================
// Configuration centrale du restaurant — tout est modifiable ici
// =========================================================

export const site = {
  name: "Pollo Gigante",
  tagline: "Cuisine sénégalaise & saveurs d'Italie",
  description:
    "Pollo Gigante — restaurant sénégalais à l'âme généreuse. Nos poulets braisés, nos spécialités du pays (thiéboudienne, yassa, mafé) et nos classiques italiens comme les lasagnes maison, servis dans un cadre chaleureux.",
  // Devise affichée (change « € » en « FCFA » si besoin)
  currency: "€",
  phone: "+33 1 23 45 67 89",
  phoneHref: "tel:+33123456789",
  email: "contact@pollogigante.com",
  address: {
    line1: "24 Avenue de la Gastronomie",
    line2: "75011 Paris",
    country: "France",
  },
  // Lien Google Maps (remplace par l'adresse réelle du restaurant)
  mapsEmbed:
    "https://www.google.com/maps?q=24+Avenue+de+la+Republique+Paris&output=embed",
  mapsLink: "https://maps.google.com/?q=Pollo+Gigante",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    whatsapp: "https://wa.me/33123456789",
  },
  hours: [
    { day: "Lundi", value: "Fermé", closed: true },
    { day: "Mardi — Jeudi", value: "11h30 – 15h · 18h30 – 23h", closed: false },
    { day: "Vendredi — Samedi", value: "11h30 – 15h · 18h30 – 00h30", closed: false },
    { day: "Dimanche", value: "12h – 16h · 18h30 – 22h30", closed: false },
  ],
} as const;

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Galerie", href: "/galerie" },
  { label: "Contact", href: "/contact" },
] as const;
