import { useEffect, useState } from "react";
import * as Font from "expo-font";

export default function useFonts() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function importFonts() {
      try {
        await Font.loadAsync({
          "Catch B ExtraBold": require("assets/fonts/NPSfont_extrabold.ttf"),
          "Catch B Bold": require("assets/fonts/NPSfont_bold.ttf"),
          "Catch B Regular": require("assets/fonts/NPSfont_regular.ttf"),
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsReady(true);
      }
    }

    importFonts();
  }, []);

  return isReady;
}
