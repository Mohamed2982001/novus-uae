import {
  Tajawal,
  Outfit,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";

export const fontTajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const fontVariables = `${fontTajawal.variable} ${fontOutfit.variable} ${fontJakarta.variable} ${fontMono.variable}`;
