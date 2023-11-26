import { Analytics } from "@vercel/analytics/react";
import React, { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PostHogPageview } from "@/components/PosthogProvider";
import "@/styles/global.css";
import { getMetadata } from "@/utils/metadata";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="google-adsense-account" content="ca-pub-4774626535817335" />
        <link rel="icon" href="/favicon/favicon.png" type="image/png" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4774626535817335"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <div className="relative w-full flex flex-col">
          <Header />
          <main className="shrink-0 grow basis-auto mx-auto pt-6 pb-16 px-6 w-full max-w-6xl flex flex-col justify-start items-center">
            {children}
          </main>
          <Footer />
        </div>
        <Suspense>
          <Analytics />
          <PostHogPageview />
        </Suspense>
      </body>
    </html>
  );
};

export const metadata = getMetadata({});

export default RootLayout;
