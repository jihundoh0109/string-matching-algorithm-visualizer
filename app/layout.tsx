import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { VisualizationProvider } from "@/context/VisualizationProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "String Search Visualizer",
  description:
    "A web application that helps visualize various string search algorithms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VisualizationProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </VisualizationProvider>
  );
}
