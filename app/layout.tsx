import type { Metadata } from "next";
// import localFont from "next/font/local";
import "../styles/globals.css";
import "../styles/styles.css";

import { locales } from "@/i18n/i18n.config";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";
import SessionWrapper from "@/auth/SessionWrapper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import dynamic from "next/dynamic";
// import PersistGateWrapper from "@/redux/PersistGateWrapper";
// import { notFound } from 'next/navigation';
// const codecPro = localFont({
//   src: "./fonts/CodecPro-Regular.ttf",
//   variable: "--font-codecpro",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "TrainTicket.Hub - The Best Way to Booking Train Ticket",
  description: "Generated by create next app",
  icons: {
    icon: "/logo.jpg",
  },
};
type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const ReduxProvider = dynamic(() => import("@/redux/StoreProvider"), {
  ssr: false,
});

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} />
        {/* <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" /> */}
        {/* <SessionWrapper> */}
        <ToastContainer />
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            {/* <PersistGateWrapper> */}
            {children}
            {/* </PersistGateWrapper> */}
          </ReduxProvider>
        </NextIntlClientProvider>
        {/* </SessionWrapper> */}
      </body>
    </html>
  );
}
