import MainPage from "@/features/home/main-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Simple PDF Viewer`,
  description: `Simple PDF Viewer by Wisman Nur. Visit my personal website at https://wismannur.pro`,
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-32x32.png",
    },
  ],
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    images: "/image-meta.png",
  },
};

export default function Home() {
  return (
    <>
      <MainPage />
    </>
  );
}
