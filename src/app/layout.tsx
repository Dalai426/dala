import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "./head";
import AdminLayout from "@/layouts/AdminLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <Head/>
      <body className={inter.className}>
      <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  );
}
