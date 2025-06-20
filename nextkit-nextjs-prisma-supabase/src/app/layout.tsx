
import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./css/globals.css";
import { ThemeModeScript, ThemeProvider } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import { CustomizerContextProvider } from "@/app/context/customizerContext";
import '../utils/i18n';
import NextTopLoader from 'nextjs-toploader';
const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });
import { AuthProvider } from '../app/context/AuthContext'


export const metadata: Metadata = {
  title: "NextKit - Supabase Prisma Orm",
  description: "NextKit is a backend template powered by supabase and Prisma orm",
};

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session: any
}) {
  return (

    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body className={`${plus_jakarta_sans.className}`}>
        <NextTopLoader />
        <ThemeProvider theme={customTheme}>
          <AuthProvider>
            <CustomizerContextProvider>
              {children}
            </CustomizerContextProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html >

  );
}



