// Images Unsplash (URLs vérifiées). Remplace les identifiants par tes propres
// photos quand elles sont prêtes, ou pose tes fichiers dans /public et change
// la valeur ici (ex : "/photos/poulet.jpg").

export function unsplash(id: string, w = 1200, q = 72): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const IMG = {
  hero: "photo-1414235077428-338989a2e8c0",
  heroAlt: "photo-1517248135467-4c7edcad34c4",
  interior: "photo-1552566626-52f8b828add9",
  table: "photo-1511690656952-34342bb7c2f2",
  chef: "photo-1555939594-58d7cb561ad1",
  grill: "photo-1600891964092-4316c288032e",
  // Plats
  pouletBraise: "photo-1529692236671-f1f6cf9683ba",
  pouletGrille: "photo-1550547660-d9450f859349",
  ailes: "photo-1544025162-d76694265947",
  thieb: "photo-1512621776951-a57141f2eefd",
  yassa: "photo-1604908176997-125f25cc6f3d",
  mafe: "photo-1540189549336-e6e99c3679fe",
  poisson: "photo-1467003909585-2f8a72700288",
  lasagnes: "photo-1606491956689-2ea866880c84",
  pizza: "photo-1533777324565-a040eb52facd",
  pates: "photo-1598515214211-89d3c73ae83b",
  entree1: "photo-1476224203421-9ac39bcb3327",
  entree2: "photo-1432139555190-58524dae6a55",
  salade: "photo-1512621776951-a57141f2eefd",
  dessert1: "photo-1565299624946-b28f40a0ae38",
  dessert2: "photo-1601050690597-df0568f70950",
  boisson: "photo-1626645738196-c2a7c87a8f58",
  // Galerie supplémentaire
  g1: "photo-1504674900247-0877df9cc836",
  g2: "photo-1559847844-5315695dadae",
  g3: "photo-1588168333986-5078d3ae3976",
  g4: "photo-1594041680534-e8c8cdebd659",
  g5: "photo-1529692236671-f1f6cf9683ba",
  g6: "photo-1533777324565-a040eb52facd",
} as const;
