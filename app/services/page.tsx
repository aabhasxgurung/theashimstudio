import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ServiceMenu } from "@/components/ServiceMenu";
import { BookingFooter } from "@/components/BookingFooter";

export const metadata: Metadata = {
  title: "Services & Pricing | The Ashim Salon",
  description:
    "The full Ashim Salon menu: haircuts, colour, hair spa, nails, lashes, waxing and more, with prices listed plainly in Nepalese rupees.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServiceMenu />
        <BookingFooter />
      </main>
    </>
  );
}
