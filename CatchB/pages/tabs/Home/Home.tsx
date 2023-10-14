import { useCallback } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Dashboard from "./components/Dashboard";
import Facilities from "./components/Facilities";
import Coaches from "./components/Coaches";
import Items from "./components/Items";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [fontsLoaded] = useFonts({
    "KBO Dia Gothic_medium": require("assets/fonts/KBO_Dia_Gothic_medium.ttf"),
    "KBO Dia Gothic_bold": require("assets/fonts/KBO_Dia_Gothic_bold.ttf"),
    "KBO Dia Gothic_light": require("assets/fonts/KBO_Dia_Gothic_light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff" }}
      onLayout={onLayoutRootView}
    >
      <ScrollView>
        <Dashboard />
        <Facilities />
        <Coaches />
        <Items />
      </ScrollView>
    </SafeAreaView>
  );
}
