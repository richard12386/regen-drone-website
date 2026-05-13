import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "REGEN Flight",
    short_name: "REGEN",
    description: "Drone fleet control and management",
    start_url: "/app",
    display: "standalone",
    background_color: "#070d0e",
    theme_color: "#49c4c1",
    orientation: "landscape-primary",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Control Center",
        url: "/app",
        description: "Open drone control dashboard",
      },
    ],
    categories: ["utilities", "productivity"],
  };
}
