// The Ashim Salon service menu
// Prices in NPR. `price` is the numeric base; `priceLabel` is the display string
// and is the source of truth where a service has dual/range pricing.

export type Service = {
  id: string;
  name: string;
  price: number | null; // null when the service has no single base price
  priceLabel: string; // always display this to users
  note?: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  services: Service[];
};

export const serviceMenu: ServiceCategory[] = [
  {
    id: "haircuts",
    name: "Haircuts",
    services: [
      {
        id: "haircut-ladies",
        name: "Haircut (Ladies)",
        price: 1500,
        priceLabel: "₨ 1,500",
      },
      {
        id: "haircut-gents",
        name: "Haircut (Gents)",
        price: 1000,
        priceLabel: "₨ 1,000",
      },
      {
        id: "beard-trim-styling",
        name: "Beard Trim / Styling",
        price: 250,
        priceLabel: "₨ 250 – 500",
      },
    ],
  },
  {
    id: "hair-wash",
    name: "Hair Wash",
    services: [
      {
        id: "ladies-hair-wash",
        name: "Ladies Hair Wash",
        price: 600,
        priceLabel: "₨ 600",
      },
      {
        id: "gents-hair-wash",
        name: "Gents Hair Wash",
        price: 400,
        priceLabel: "₨ 400",
      },
      {
        id: "wash-blowdrying",
        name: "Wash & Blowdrying",
        price: 1200,
        priceLabel: "₨ 1,200",
      },
      {
        id: "temporary-straight",
        name: "Temporary Straight",
        price: 1500,
        priceLabel: "₨ 1,500",
      },
      {
        id: "tong-rod-waves-curls",
        name: "Tong Rod Waves & Curls",
        price: 2000,
        priceLabel: "₨ 2,000",
      },
    ],
  },
  {
    id: "hair-spa-treatment",
    name: "Hair Spa Treatment",
    services: [
      { id: "hair-spa", name: "Hair SPA", price: 3500, priceLabel: "₨ 3,500" },
      {
        id: "fiberflex-treatment",
        name: "Fiberflex Treatment",
        price: 4500,
        priceLabel: "₨ 4,500",
        note: "45 min",
      },
      {
        id: "ceramide-treatment",
        name: "Ceramide Treatment",
        price: 4500,
        priceLabel: "₨ 4,500",
      },
      {
        id: "hair-botox",
        name: "Hair Botox",
        price: 8000,
        priceLabel: "₨ 8,000",
      },
      {
        id: "hair-nanoplastia",
        name: "Hair Nanoplastia",
        price: 8500,
        priceLabel: "₨ 8,500",
      },
      {
        id: "hair-rebonding",
        name: "Hair Rebonding",
        price: 7500,
        priceLabel: "₨ 7,500",
      },
    ],
  },
  {
    id: "hair-color",
    name: "Hair Color",
    services: [
      {
        id: "hair-root-touch-ladies",
        name: "Hair Root Touch (Ladies)",
        price: 3000,
        priceLabel: "₨ 3,000",
      },
      {
        id: "global-hair-color-ladies",
        name: "Global Hair Color (Ladies)",
        price: 6500,
        priceLabel: "₨ 6,500",
      },
      {
        id: "global-hair-color-gents",
        name: "Global Hair Color (Gents)",
        price: 2500,
        priceLabel: "₨ 2,500",
      },
      {
        id: "highlights-color-ladies",
        name: "Highlights Color (Ladies)",
        price: 7000,
        priceLabel: "₨ 7,000",
      },
      {
        id: "baby-highlights-ladies",
        name: "Baby Highlights (Ladies)",
        price: 8500,
        priceLabel: "₨ 8,500",
      },
      {
        id: "balayage-highlights-ladies",
        name: "Balayage Highlights (Ladies)",
        price: 9500,
        priceLabel: "₨ 9,500",
      },
      {
        id: "highlights-color-gents",
        name: "Highlights Color (Gents)",
        price: 4500,
        priceLabel: "₨ 4,500",
      },
    ],
  },
  {
    id: "nails",
    name: "Nails",
    services: [
      {
        id: "nail-removal",
        name: "Nail Removal",
        price: 1000,
        priceLabel: "₨ 1,000",
      },
      {
        id: "nail-re-filling",
        name: "Nail Re-Filling",
        price: 2500,
        priceLabel: "₨ 2,500",
      },
      {
        id: "nail-gel-polish",
        name: "Nail Gel Polish",
        price: 2000,
        priceLabel: "₨ 2,000",
      },
      {
        id: "nail-gel-extension",
        name: "Nail Gel Extension",
        price: 3000,
        priceLabel: "₨ 3,000",
      },
      {
        id: "nail-hard-gel",
        name: "Nail Hard Gel",
        price: 3000,
        priceLabel: "₨ 3,000",
      },
      { id: "nail-art", name: "Nail Art", price: 50, priceLabel: "₨ 50 – 150" },
    ],
  },
  {
    id: "eyelashes",
    name: "Eyelashes",
    services: [
      {
        id: "eyelash-lifting",
        name: "Eyelash Lifting",
        price: 1500,
        priceLabel: "₨ 1,500",
      },
      {
        id: "eyelash-re-filling",
        name: "Eyelash Re-Filling",
        price: 1500,
        priceLabel: "₨ 1,500",
      },
      {
        id: "eyelash-remove",
        name: "Eyelash Remove",
        price: 1000,
        priceLabel: "₨ 1,000",
      },
      {
        id: "classic-lash-extension",
        name: "Classic Lash Extension",
        price: 3000,
        priceLabel: "₨ 3,000",
      },
      { id: "hybrid-lash", name: "Hybrid", price: 3500, priceLabel: "₨ 3,500" },
      { id: "2d-3d-lash", name: "2D / 3D", price: 3500, priceLabel: "₨ 3,500" },
      { id: "wispy-lash", name: "Wispy", price: 4000, priceLabel: "₨ 4,000" },
    ],
  },
  {
    id: "cleansing",
    name: "Cleansing",
    services: [
      {
        id: "normal-cleansing",
        name: "Normal Cleansing",
        price: 1500,
        priceLabel: "₨ 1,500",
      },
      {
        id: "deep-cleansing",
        name: "Deep Cleansing",
        price: 2000,
        priceLabel: "₨ 2,000",
      },
      {
        id: "detening-cleaning",
        name: "Detening Cleaning",
        price: 2000,
        priceLabel: "₨ 2,000",
      },
    ],
  },
  {
    id: "waxing",
    name: "Waxing",
    services: [
      {
        id: "full-hand",
        name: "Full Hand",
        price: 2000,
        priceLabel: "₨ 2,000",
      },
      { id: "full-leg", name: "Full Leg", price: 3000, priceLabel: "₨ 3,000" },
      {
        id: "half-hand",
        name: "Half Hand",
        price: 1000,
        priceLabel: "₨ 1,000",
      },
      { id: "half-leg", name: "Half Leg", price: 1500, priceLabel: "₨ 1,500" },
      { id: "under-arm", name: "Under Arm", price: 500, priceLabel: "₨ 500" },
      {
        id: "full-body",
        name: "Full Body",
        price: 6000,
        priceLabel: "₨ 6,000",
      },
      {
        id: "bikini-wax",
        name: "Bikini Wax",
        price: 2500,
        priceLabel: "₨ 2,500",
      },
      { id: "full-face", name: "Full Face", price: 500, priceLabel: "₨ 500" },
      { id: "threading", name: "Threading", price: 200, priceLabel: "₨ 200" },
      { id: "upper-lips", name: "Upper Lips", price: 50, priceLabel: "₨ 50" },
      { id: "forehead", name: "Forehead", price: 100, priceLabel: "₨ 100" },
    ],
  },
  {
    id: "massage",
    name: "Massage",
    services: [
      {
        id: "head-massage-ladies",
        name: "Head Massage (Ladies)",
        price: 2500,
        priceLabel: "₨ 2,500",
        note: "30 min",
      },
      {
        id: "head-massage-gents",
        name: "Head Massage (Gents)",
        price: 1500,
        priceLabel: "₨ 1,500",
        note: "30 min",
      },
    ],
  },
];
