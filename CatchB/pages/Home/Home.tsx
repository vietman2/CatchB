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
import RecentVisit from "../../components/RecentVisit";
import Subheading from "../../components/Subheading";
import Facility from "../../components/Facility";

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

  return (
    <SafeAreaView
      style={{ backgroundColor: "#fff" }}
      onLayout={onLayoutRootView}
    >
      <ScrollView>
        <Search />
        <Shortcuts />
        <View style={styles.ads}>
          <Text style={{ fontSize: 30, color: "yellow" }}>광고</Text>
        </View>
        <Heading title="최근 본 시설" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <RecentVisit name="스윕 베이스볼 아카데미" image_id={1} />
          <RecentVisit name="시흥 엘리트 야구 레슨" image_id={2} />
        </ScrollView>
        <Heading title="나에게 딱 맞는, 캐치B 추천" />
        <Subheading description="캐치B가 추천하는 레슨장" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <Facility
            name="원스타베이스볼 아카데미"
            address="경기 고양시 일산서구 가좌로 62"
            image_id={1}
          />
          <Facility
            name="분당 빠따형 야구레슨"
            address="경기 성남시 분당구 발이봉북로 3"
            image_id={2}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
