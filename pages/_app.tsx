import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Inter } from "next/font/google";
import PageHeader from "@/components/page-header";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className + " min-h-screen"}>
      <NextNProgress />
      <PageHeader />
      <main
        className={`flex flex-col items-center justify-between pb-6 lg:pb-24 px-6 lg:px-24 overflow-x-scroll`}
      >
        <Component {...pageProps} />
      </main>
    </div>
  );
}
