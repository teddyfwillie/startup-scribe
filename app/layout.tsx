import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "easymde/dist/easymde.min.css";

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "StartupSprout",
  description: "A platform for startup founders to connect with investors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children} <Toaster />
      </body>
    </html>
  );
}
