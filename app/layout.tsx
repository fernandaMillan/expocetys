import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://icc.cetys.mx"),
  title: {
    default: "ICC CETYS Mexicali | Ingeniería en Ciencias Computacionales",
    template: "%s | ICC CETYS Mexicali",
  },
  description:
    "Descubre Ingeniería en Ciencias Computacionales en CETYS Mexicali: proyectos, comunidad, experiencias y caminos profesionales.",
  openGraph: {
    title: "ICC CETYS Mexicali",
    description:
      "Una comunidad donde la curiosidad se convierte en proyectos y la tecnología en soluciones.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
