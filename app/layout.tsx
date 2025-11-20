import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Raymond Revel - Singer-Songwriter & Producer",
  description: "Official website of Raymond Revel, singer-songwriter and producer based in Fort Worth, Texas. Listen to music, watch videos, view photos, and read the latest blog posts.",
  keywords: ["Raymond Revel", "music", "singer-songwriter", "producer", "Fort Worth", "Texas"],
  openGraph: {
    title: "Raymond Revel - Singer-Songwriter & Producer",
    description: "Official website of Raymond Revel, singer-songwriter and producer based in Fort Worth, Texas.",
    type: "website",
    url: "https://www.raymondrevelmusic.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
