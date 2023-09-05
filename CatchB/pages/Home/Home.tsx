import { useCallback } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Search from "../../components/Home/Search";
import Shortcut from "../../components/Home/Shortcut";
import Heading from "../../components/Home/Heading";
import RecentVisit from "../../components/Home/RecentVisit";
import Subheading from "../../components/Home/Subheading";
import Facility from "../../components/Home/Facility";
import CoachSimple from "../../components/Home/CoachSimple";
import InfoSimple from "../../components/Home/InfoSimple";
import { RootTabParamList } from "../../containers/TabContainer";
import { coaches, facilities, informations } from "../../variables/dummydata";
import { styles } from "./styles";

type HomeProps = BottomTabScreenProps<RootTabParamList, "Home">;

SplashScreen.preventAutoHideAsync();

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

  const Ads = () => {
    return (
      <View style={styles.ads}>
        <Text style={{ fontSize: 30, color: "yellow" }}>광고</Text>
      </View>
    );
  };

  const RecentVisits = () => {
    return (
      <View>
        <Heading title="최근 본 시설" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <RecentVisit facility={facilities[2]} />
          <RecentVisit facility={facilities[3]} />
        </ScrollView>
      </View>
    );
  };

  const RecommendedFacilities = () => {
    return (
      <View>
        <Heading title="나에게 딱 맞는, 캐치B 추천" />
        <Subheading description="캐치B가 추천하는 레슨장" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <Facility facility={facilities[0]} />
          <Facility facility={facilities[1]} />
        </ScrollView>
      </View>
    );
  };

  const RecommendedCoaches = () => {
    return (
      <View>
        <Heading title="우리 동네 추천 레슨 코치!" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <CoachSimple coach={coaches[0]} />
          <CoachSimple coach={coaches[2]} />
          <CoachSimple coach={coaches[1]} />
        </ScrollView>
      </View>
    );
  };

  const RecommendedItems = () => {
    return (
      <View>
        <Heading title="Catch B 핫정보!" />
        <Subheading description="#캐치비추천템 #야구OOTD #요즘야구복 #야구배트" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <InfoSimple information={informations[0]} />
          <InfoSimple information={informations[1]} />
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff" }}
      onLayout={onLayoutRootView}
    >
      <ScrollView>
        <Search />
        <Shortcuts />
        <Ads />
        <RecentVisits />
        <RecommendedFacilities />
        <RecommendedCoaches />
        <RecommendedItems />
      </ScrollView>
    </SafeAreaView>
  );
}
