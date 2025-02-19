import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "@/components/dashboard-wrapper";

const font = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory Management",
  description:
    "Inventory Management is the process of efficiently overseeing, controlling, and optimizing the storage, movement, and utilization of goods within a business. It involves tracking stock levels, managing supply chains, and ensuring that the right products are available at the right time to meet customer demand while minimizing costs and preventing overstock or stockouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
