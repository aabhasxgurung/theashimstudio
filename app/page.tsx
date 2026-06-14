import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Barbers } from "@/components/Barbers";
import { BookingFooter } from "@/components/BookingFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Barbers />
        <About />
        <Services />
        <BookingFooter />
      </main>
    </>
  );
}
