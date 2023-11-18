import { useCallback } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import SearchBar from "../components/SearchBar";
import Facilities from "../containers/RecommendedFacilities";
import Coaches from "../containers/CoachesHorizontal";
import Items from "../containers/Items";
import { cardStyles } from "./styles";

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
    <SafeAreaView onLayout={onLayoutRootView}>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <SearchBar />
        <View style={cardStyles.ads}>
          <Text style={{ fontSize: 30, color: "yellow" }}>광고</Text>
        </View>
        <Facilities />
        <Coaches />
        <Items />
      </ScrollView>
    </SafeAreaView>
  );
}
