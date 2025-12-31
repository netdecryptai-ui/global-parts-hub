import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// IMPORT THE PROVIDER
import { CartProvider } from "./context/CartContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Parts Hub",
  description: "Phone repair parts marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* WRAP THE CHILDREN HERE */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}