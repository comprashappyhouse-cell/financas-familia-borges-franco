import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "br.com.borgesfranco.financas",
  appName: "Finanças Borges Franco",
  webDir: "public",
  server: {
    url: "https://financas-familia-borges-franco.onrender.com",
    cleartext: false,
  },
  android: {
    backgroundColor: "#061019",
  },
};

export default config;
