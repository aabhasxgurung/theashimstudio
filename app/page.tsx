import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Ethos } from "@/components/Ethos";
import { StatsBand } from "@/components/StatsBand";
import { Gallery } from "@/components/Gallery";
import { Services } from "@/components/Services";
import { Barbers } from "@/components/Barbers";
import { Appointments } from "@/components/Appointments";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ethos />
        <StatsBand />
        <Gallery />
        <Services />
        <Barbers />
        <Appointments />
      </main>
    </>
  );
}
