import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Booking } from "@/components/Booking";

export const metadata: Metadata = {
  title: "Book — The Ashim Studio",
  description:
    "Reserve your chair at The Ashim Studio. Choose a service, artist and time — we'll confirm within a day.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main>
        <Booking />
      </main>
    </>
  );
}
