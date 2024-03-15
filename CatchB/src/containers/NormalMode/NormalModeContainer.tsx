import { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Surface, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CoachPreview, CoachTypes, Filters, Shortcut } from "./fragments";
import { SmallLogo } from ".components/Logos";
import { HomeScreenProps, HomeParams } from ".constants/navigation";
import { sampleCoaches } from "../../variables/mvp_dummy_data/coaches";

const NormalStack = createStackNavigator<HomeParams>();

function NormalHome() {
  const [selected, setSelected] = useState<CoachTypes>("타격");
  const navigation =
    useNavigation<HomeScreenProps<"SplashScreen">["navigation"]>();
  const { width } = Dimensions.get("window");
  const tabWidth = (width - 50) / 2;
  const examplecoach = sampleCoaches[2];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabs}>
        <Surface elevation={2} style={[styles.surface, { width: tabWidth }]}>
          <TouchableOpacity onPress={() => navigation.navigate("Nearby")}>
            <Text style={styles.title} variant="headlineSmall">
              아카데미 예약
            </Text>
            <Text style={styles.subtitle} variant="titleSmall">
              내 주변 간편 예약
            </Text>
            <Image
              source={require("assets/images/main1.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </Surface>
        <Surface elevation={2} style={[styles.surface, { width: tabWidth }]}>
          <TouchableOpacity onPress={() => navigation.navigate("Nearby")}>
            <Text style={styles.title} variant="headlineSmall">
              레슨
            </Text>
            <Text style={styles.subtitle} variant="titleSmall">
              프로 레슨 가격 비교
            </Text>
            <Image
              source={require("assets/images/main2.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </Surface>
      </View>
      <View style={styles.shortcuts}>
        <Shortcut text="야구톡" />
        <Shortcut text="정보" />
        <Shortcut text="모집" />
        <Shortcut text="이벤트" />
      </View>
      <View style={styles.ads}>
        <Text variant="displayMedium" style={{ color: "gold" }}>
          광고
        </Text>
      </View>
      <View style={styles.coachRecommend}>
        <Text variant="headlineSmall" style={{ color: "black" }}>
          내 주변 추천 레슨 코치
        </Text>
        <View style={styles.filter}>
          <Filters selected={selected} setSelected={setSelected} />
        </View>
        <CoachPreview coach={examplecoach} />
        <CoachPreview coach={examplecoach} />
        <CoachPreview coach={examplecoach} />
      </View>
    </ScrollView>
  );
}

export default function NormalModeContainer() {
  return (
    <NormalStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerLeft: SmallLogo,
        headerTitle: () => {
          return null;
        },
        headerShadowVisible: false,
      }}
    >
      <NormalStack.Screen name="SplashScreen" component={NormalHome} />
    </NormalStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  surface: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "green",
  },
  ads: {
    marginTop: 30,
    backgroundColor: "skyblue",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "Catch B Bold",
  },
  subtitle: {
    color: "gray",
    textAlign: "left",
    flexWrap: "wrap",
  },
  image: {
    alignSelf: "flex-end",
    height: 100,
    width: 100,
    marginTop: 15,
  },
  shortcuts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  coachRecommend: {
    marginTop: 30,
  },
  filter: {
    flexDirection: "row",
    marginTop: 10,
  },
});
