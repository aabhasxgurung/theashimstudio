// The Ashim Studio — physical locations.
// 3 branches: 2 in Butwal, 1 in Kathmandu. Branch names, addresses and
// WhatsApp numbers below are PLACEHOLDERS — swap in the real values.
// WhatsApp numbers must be full international, digits only (no +, no spaces),
// e.g. Nepal "9779800000000", so wa.me links resolve.

export type Location = {
  id: string;
  /** "Butwal" | "Kathmandu" — the city, used as the headline label. */
  city: string;
  /** Branch / neighbourhood name. */
  branch: string;
  /** Composed display label, e.g. "Butwal — Traffic Chowk". */
  label: string;
  address: string;
  /** Digits-only international number for wa.me links. */
  whatsapp: string;
  /** Human-readable number for display / tel: links. */
  phoneDisplay: string;
};

export const locations: Location[] = [
  {
    id: "butwal-traffic-chowk",
    city: "Butwal",
    branch: "Traffic Chowk", // placeholder
    label: "Butwal — Traffic Chowk",
    address: "Traffic Chowk, Butwal", // placeholder
    whatsapp: "9779800000001", // placeholder
    phoneDisplay: "+977 980-000-0001", // placeholder
  },
  {
    id: "butwal-golpark",
    city: "Butwal",
    branch: "Golpark", // placeholder
    label: "Butwal — Golpark",
    address: "Golpark, Butwal", // placeholder
    whatsapp: "9779800000002", // placeholder
    phoneDisplay: "+977 980-000-0002", // placeholder
  },
  {
    id: "kathmandu-durbar-marg",
    city: "Kathmandu",
    branch: "Durbar Marg", // placeholder
    label: "Kathmandu — Durbar Marg",
    address: "Durbar Marg, Kathmandu", // placeholder
    whatsapp: "9779800000003", // placeholder
    phoneDisplay: "+977 980-000-0003", // placeholder
  },
];

export function getLocation(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}

/** Build a wa.me deep link with a pre-filled message. */
export function whatsappLink(location: Location, message: string): string {
  return `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(message)}`;
}
