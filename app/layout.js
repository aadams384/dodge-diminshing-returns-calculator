import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dodge DR Calculator",
  description: "i be dodgin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen ${inter.className}`}>{children}</body>
    </html>
  );
}
