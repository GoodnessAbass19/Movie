import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layouts/Header";
import Providers from "./components/layouts/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie-Zone",
  description: "Checkout your movies here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.className} overflow-x-hidden`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
