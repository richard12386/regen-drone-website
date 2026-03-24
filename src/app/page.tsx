import Link from "next/link";
import { Navbar } from "@/components/site/navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-6xl font-bold mb-6">
          REGEN
        </h1>

        <p className="text-xl mb-10 text-gray-400">
          Humans Can Fly
        </p>

        <Link
          href="/products"
          className="px-6 py-3 bg-cyan-400 text-black rounded-full"
        >
          Explore Products
        </Link>
      </main>
    </>
  );
}
