// https://unocss.dev/guide/
import { defineConfig, presetWind3 } from "unocss";

const breakpoints = {
  phone: { max: "767px" },
  tablet: { min: "768px", max: "1023px" },
  smallLaptop: { min: "1024px", max: "1279px" },
  desktop: { min: "1280px" },
  touchDevice: { max: "1023px" }, // mobile + tablet
};

export default defineConfig({
  theme: {
    colors: {
      orange: "#FF884B",
      modalBackdrop: "#00000080",
      black: "#2E2E2E",
      blackOriginal: "#000000",
      white: "#ffffff",
      orangeBland: "#fff3ed",
      grayBland: "#DEDEDE",
      redError: "#FF2121",
      lightGray: "#FAFAFA",
      orangeButton: '#FF7F00',
    },
  },
  presets: [presetWind3()],
  variants: [
    (matcher) => {
      for (const [key, range] of Object.entries(breakpoints)) {
        if (!matcher.startsWith(`${key}:`)) continue;

        const newMatcher = matcher.slice(key.length + 1);
        const media = Object.entries(range)
          .map(([k, v]) => `(${k}-width: ${v})`)
          .join(" and ");

        return {
          matcher: newMatcher,
          parent: `@media ${media}`,
        };
      }
    },
  ],
});
