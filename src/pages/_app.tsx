import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/custom/layout";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });
import { DateContextProvider } from "@/context/DateRangeContext";
export default function App({ Component, pageProps }: AppProps) {
  

  return <div  className={`${inter.className}`} > <DateContextProvider><Layout> <Component {...pageProps} /> </Layout> </DateContextProvider> <Toaster /></div>;
}
