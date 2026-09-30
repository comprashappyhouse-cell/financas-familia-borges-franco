import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Finanças Família Borges Franco",
    short_name: "Finanças BF",
    description: "Controle financeiro da Família Borges Franco",
    start_url: "/",
    display: "standalone",
    background_color: "#061019",
    theme_color: "#0c3a5e",
    orientation: "portrait-primary",
    icons: [
      { src: "/brasao-borges-franco.jpg", sizes: "any", type: "image/jpeg", purpose: "any" },
      { src: "/brasao-borges-franco.jpg", sizes: "any", type: "image/jpeg", purpose: "maskable" },
    ],
  };
}
