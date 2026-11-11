import { IMG } from "./images";

export type Dish = {
  name: string;
  description: string;
  price: number;
  image?: string; // identifiant Unsplash (voir lib/images.ts)
  tags?: string[]; // ex : "Signature", "Épicé", "Végé"
  popular?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  dishes: Dish[];
};

export const menu: MenuCategory[] = [
  {
    id: "entrees",
    title: "Entrées",
    subtitle: "Pour bien commencer, à partager",
    dishes: [
      {
        name: "Pastels au thon",
        description:
          "Petits beignets croustillants farcis au thon épicé, sauce tomate maison.",
        price: 6,
        image: IMG.entree1,
        tags: ["Du pays"],
        popular: true,
      },
      {
        name: "Accara",
        description:
          "Beignets de haricots niébé frits, légers et moelleux, sauce piquante.",
        price: 5.5,
        tags: ["Végé"],
      },
      {
        name: "Fataya viande",
        description:
          "Chaussons dorés garnis de viande hachée assaisonnée et oignons confits.",
        price: 6.5,
        image: IMG.entree2,
      },
      {
        name: "Salade Avocat & Crevettes",
        description:
          "Avocat frais, crevettes, mangue et vinaigrette au citron vert.",
        price: 9,
        tags: ["Frais"],
      },
    ],
  },
  {
    id: "poulet",
    title: "Le Poulet Gigante",
    subtitle: "Notre signature, braisé au feu de bois",
    dishes: [
      {
        name: "Poulet Braisé Gigante",
        description:
          "Notre poulet star mariné 24h, braisé au feu de bois, sauce oignon yassa. Servi avec frites de manioc ou riz.",
        price: 15,
        image: IMG.pouletBraise,
        tags: ["Signature"],
        popular: true,
      },
      {
        name: "Demi-Poulet Grillé",
        description:
          "Un demi-poulet fondant aux épices maison, légumes grillés et sauce kani.",
        price: 13,
        image: IMG.pouletGrille,
      },
      {
        name: "Ailes de Poulet Épicées",
        description:
          "Ailes croustillantes glacées à la sauce piment-miel, parts de 6 ou 12.",
        price: 8,
        image: IMG.ailes,
        tags: ["Épicé"],
        popular: true,
      },
      {
        name: "Poulet Yassa",
        description:
          "Poulet mijoté aux oignons caramélisés, citron et moutarde, riz blanc parfumé.",
        price: 13.5,
        image: IMG.yassa,
      },
    ],
  },
  {
    id: "senegal",
    title: "Spécialités Sénégalaises",
    subtitle: "Les trésors de la cuisine du Sénégal",
    dishes: [
      {
        name: "Thiéboudienne",
        description:
          "Le plat national : riz rouge au poisson, légumes mijotés et sauce tomate. Généreux.",
        price: 16,
        image: IMG.thieb,
        tags: ["Du pays"],
        popular: true,
      },
      {
        name: "Mafé Bœuf",
        description:
          "Ragoût de bœuf à la sauce d'arachide onctueuse, légumes et riz blanc.",
        price: 14.5,
        image: IMG.mafe,
      },
      {
        name: "Poisson Braisé",
        description:
          "Daurade entière braisée, attiéké, oignons et sauce piquante maison.",
        price: 17,
        image: IMG.poisson,
        tags: ["Frais"],
      },
      {
        name: "Soupou Kandia",
        description:
          "Sauce gombo au poisson et fruits de mer, servie sur riz blanc.",
        price: 15,
        tags: ["Épicé"],
      },
    ],
  },
  {
    id: "italie",
    title: "Saveurs d'Italie",
    subtitle: "Nos classiques italiens faits maison",
    dishes: [
      {
        name: "Lasagnes Maison",
        description:
          "Pâtes fraîches, ragù de bœuf mijoté, béchamel crémeuse et parmesan gratiné.",
        price: 13,
        image: IMG.lasagnes,
        tags: ["Maison"],
        popular: true,
      },
      {
        name: "Spaghetti Bolognaise",
        description:
          "Spaghetti al dente, sauce bolognaise longuement mijotée, basilic frais.",
        price: 11.5,
        image: IMG.pates,
      },
      {
        name: "Pizza Reine Gigante",
        description:
          "Mozzarella, jambon, champignons, olives — pâte fine et croustillante.",
        price: 12,
        image: IMG.pizza,
      },
      {
        name: "Penne Arrabbiata",
        description:
          "Penne, sauce tomate relevée au piment et ail, huile d'olive et persil.",
        price: 10.5,
        tags: ["Végé", "Épicé"],
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "La touche sucrée",
    dishes: [
      {
        name: "Thiakry",
        description:
          "Couscous de mil sucré au lait fermenté, vanille et fleur d'oranger.",
        price: 5.5,
        image: IMG.dessert1,
        tags: ["Du pays"],
      },
      {
        name: "Tiramisu Maison",
        description:
          "Mascarpone, café, biscuits et cacao — la dolce vita à l'italienne.",
        price: 6,
        image: IMG.dessert2,
        popular: true,
      },
      {
        name: "Salade de Fruits Exotiques",
        description: "Mangue, ananas, papaye et fruit de la passion bien frais.",
        price: 5,
        tags: ["Frais"],
      },
    ],
  },
  {
    id: "boissons",
    title: "Boissons Maison",
    subtitle: "Jus naturels préparés sur place",
    dishes: [
      {
        name: "Bissap",
        description: "Infusion de fleurs d'hibiscus, menthe et sucre de canne.",
        price: 4,
        image: IMG.boisson,
        tags: ["Maison"],
        popular: true,
      },
      {
        name: "Jus de Gingembre",
        description: "Gingembre frais pressé, citron — vif et tonifiant.",
        price: 4,
        tags: ["Épicé"],
      },
      {
        name: "Jus de Bouye",
        description: "Jus crémeux de fruit du baobab, douceur du Sénégal.",
        price: 4.5,
      },
      {
        name: "Jus de Mangue",
        description: "Mangue mûre mixée, 100 % naturel.",
        price: 4,
      },
    ],
  },
];

// Sélection « plats populaires » pour la page d'accueil
export const popularDishes: Dish[] = menu
  .flatMap((c) => c.dishes)
  .filter((d) => d.popular)
  .slice(0, 6);
