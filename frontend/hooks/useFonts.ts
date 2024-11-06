import { useFonts as useExpoFonts } from "expo-font";
import { FontFamilies } from "@/helpers/FontFamiles";
export function useFonts() {
  return useExpoFonts({
    [FontFamilies.SofiaProRegular]: require("../assets/fonts/Sofia Pro Regular Az.otf"),
    [FontFamilies.SofiaProBlack]: require("../assets/fonts/Sofia Pro Black Az.otf"),
    [FontFamilies.SofiaProBold]: require("../assets/fonts/Sofia Pro Bold Az.otf"),
    [FontFamilies.SofiaProLight]: require("../assets/fonts/Sofia Pro Light Az.otf"),
    [FontFamilies.SofiaProExtraLight]: require("../assets/fonts/Sofia Pro ExtraLight Az.otf"),
    [FontFamilies.SofiaProMedium]: require("../assets/fonts/Sofia Pro Medium Az.otf"),
    [FontFamilies.SofiaProSemiBold]: require("../assets/fonts/Sofia Pro Semi Bold Az.otf"),
    [FontFamilies.SofiaProUltraLight]: require("../assets/fonts/Sofia Pro UltraLight Az.otf"),
  });
}