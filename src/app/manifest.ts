import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DIGITAL THREE",
    short_name: "DIGITAL THREE",
    description:
      "Engineered for high performance custom web applications, AI LLM integrations, and cloud platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/logo.PNG",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
