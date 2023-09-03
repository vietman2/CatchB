import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Search from "../../components/Search";
import Shortcut from "../../components/Shortcut";
import { RootTabParamList } from "../../containers/TabContainer";
import { styles } from "./styles";
import Heading from "../../components/Heading";
import { useCallback } from "react";

type HomeProps = BottomTabScreenProps<RootTabParamList, "Home">;

SplashScreen.preventAutoHideAsync()

export default function Home({ navigation }: HomeProps) {
  const [fontsLoaded] = useFonts({
    "KBO Dia Gothic_medium": require("../../assets/fonts/KBO_Dia_Gothic_medium.ttf"),
    "KBO Dia Gothic_bold": require("../../assets/fonts/KBO_Dia_Gothic_bold.ttf"),
    "KBO Dia Gothic_light": require("../../assets/fonts/KBO_Dia_Gothic_light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Shortcuts = () => {
    return (
      <View style={styles.shortcuts}>
        <Shortcut
          imageNumber={1}
          title="레슨"
          description={"우리 동네 야구레슨\n가격비교"}
        />
        <Shortcut
          imageNumber={2}
          title="대관"
          description={"근처 야구 실내 연습장\n간편 예약"}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }} onLayout={onLayoutRootView}>
      <ScrollView>
        <Search />
        <Shortcuts />
        <View style={styles.ads}>
          <Text style={{ fontSize: 30, color: "yellow" }}>광고</Text>
        </View>
        <Heading title="최근 본 시설" />
      </ScrollView>
    </SafeAreaView>
  );
}
