import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { AboutStory } from "@/components/AboutStory";
import { BookingFooter } from "@/components/BookingFooter";

export const metadata: Metadata = {
  title: "About — The Ashim Salon",
  description:
    "For over 15 years, Ashim Salon has redefined beauty with elegance and precision. Our story, our founder, and the philosophy behind every visit.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutStory />
        <BookingFooter />
      </main>
    </>
  );
}
