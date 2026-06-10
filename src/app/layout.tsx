import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "District Livelihood Workforce & Employment Exchange Platform (DLWEP)",
  description: "A self-operating digital ecosystem connecting skilled workers, citizens, contractors, and livelihood colleges for employment tracking and outcome generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="font-sans min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
