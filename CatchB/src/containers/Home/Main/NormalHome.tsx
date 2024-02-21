import { useRef, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Surface, Text, Chip, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { RootState } from "../../../store/store";
import { HomeStackScreenProps } from "../../../variables/navigation";
import { sampleCoaches } from "../../../variables/mvp_dummy_data/coaches";
import { CoachType } from "../../../variables/types/products";

type CoachTypes = "타격" | "투구" | "수비" | "포수";

function CoachPreview({ coach }: Readonly<{ coach: CoachType }>) {
  return (
    <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 40 }}>
      <Image
        source={coach.image}
        style={{ flex: 3, width: 100, height: 100, borderRadius: 50 }}
      />
      <View style={{ flex: 7, marginLeft: 20 }}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {coach.coach_name} 코치
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source="star" color="gold" size={20} />
          <Text variant="titleSmall">{coach.rating}/10</Text>
        </View>
        <Text variant="titleSmall">{coach.working_area}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text variant="titleSmall">1회 / 60분 50,000원</Text>
        </View>
      </View>
    </View>
  );
}

export default function NormalHome() {
  const [selected, setSelected] = useState<CoachTypes>("타격");
  const navigation =
    useNavigation<HomeStackScreenProps<"SplashScreen">["navigation"]>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["3%", "10%"], []);
  const user = useSelector((state: RootState) => state.auth.user);
  const { width } = Dimensions.get("window");
  const tabWidth = (width - 50) / 2;
  const shortcutWidth = (width - 90) / 4;
  const examplecoach = sampleCoaches[2];

  function Shortcut({ text }: Readonly<{ text: string }>) {
    return (
      <Surface style={[styles.shortcut, { width: shortcutWidth }]}>
        <Text style={styles.shortcutText}>{text}</Text>
      </Surface>
    );
  }

  function FilterChip({ label }: Readonly<{ label: string }>) {
    return (
      <TouchableOpacity onPress={() => setSelected(label as CoachTypes)}>
        <Chip style={label === selected ? styles.selectedChip : styles.chip}>
          {label}
        </Chip>
      </TouchableOpacity>
    );
  }

  return (
    <>
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
            <FilterChip label="타격" />
            <FilterChip label="투구" />
            <FilterChip label="수비" />
            <FilterChip label="포수" />
          </View>
          <CoachPreview coach={examplecoach} />
          <CoachPreview coach={examplecoach} />
          <CoachPreview coach={examplecoach} />
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        <Text variant="displaySmall">
          {user === null ? "로그인좀해라" : "왔냐?"}
        </Text>
      </BottomSheet>
    </>
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
  shortcut: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "green",
    paddingVertical: 15,
  },
  shortcutText: {
    fontFamily: "Catch B Bold",
    fontSize: 18,
  },
  coachRecommend: {
    marginTop: 30,
  },
  filter: {
    flexDirection: "row",
    marginTop: 10,
  },
  chip: {
    backgroundColor: "silver",
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: "green",
    marginRight: 10,
  },
  bottomSheet: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
