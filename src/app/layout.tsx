import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Liste des Pokémon',
  description: 'Explorez la liste des Pokémon avec leur image et leur ID.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white shadow p-4 flex items-center">
          <Link href="/pokemons" className="flex items-center">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Pokéball Logo"
              className="w-10 h-10"
            />
            <span className="text-black ml-4 text-xl font-bold">Pokémon Explorer</span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
