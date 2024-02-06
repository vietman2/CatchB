import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Button, Icon, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { themeColors } from "../../../variables/colors";
import { RootState } from "../../../store/store";
import { NearbyStackScreenProps } from "../../../variables/navigation";
import ScheduleBar from "../../../components/Tables/ScheduleBar";
import ProductsTable from "../../../components/Tables/ProductsTable";

const { width, height } = Dimensions.get("window");

export default function CoachDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [expand, setExpand] = useState(false);
  const navigation =
    useNavigation<NearbyStackScreenProps<"CoachDetail">["navigation"]>();
  const coach = useSelector((state: RootState) => state.coach.selectedCoach);

  const handleReserve = () => {
    navigation.navigate("Payment");
  };

  const renderDescription = (description: string) => {
    if (description.length > 100) {
      return (
        <TouchableOpacity
          onPress={() => setExpand(!expand)}
          activeOpacity={0.6}
        >
          <Text variant="bodyLarge" style={styles.detail}>
            {expand ? description : `${description.slice(0, 100)}...`}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text variant="bodyLarge" style={styles.detail}>
          asdf
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView horizontal pagingEnabled>
          <View style={{ ...styles.image, backgroundColor: "blue" }} />
          <View style={{ ...styles.image, backgroundColor: "red" }} />
          <View style={{ ...styles.image, backgroundColor: "yellow" }} />
        </ScrollView>
        <View style={styles.topLine}>
          <Text variant="headlineMedium" style={styles.title}>
            {coach.coach_name} 코치
          </Text>
          <View style={styles.rating}>
            <Icon source="star" size={20} color="gold" />
            <Text>{coach.rating}/10</Text>
          </View>
          <View style={styles.interactions}>
            <TouchableOpacity
              onPress={() => setIsLiked(!isLiked)}
              testID="like"
            >
              <Icon
                source={isLiked ? "heart" : "heart-outline"}
                size={20}
                color={themeColors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Icon source="share-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.description}>
          <Text variant="bodyLarge">
            {"\u2022"} 학력: {coach.academic_background}
          </Text>
          <Text variant="bodyLarge">
            {"\u2022"} 야구 경력: {coach.baseball_career}
          </Text>
          <Text variant="bodyLarge">
            {"\u2022"} 코치 경력: {coach.coaching_career}
          </Text>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            소개
          </Text>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            가격표
          </Text>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            전문 분야
          </Text>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            주 활동 지역
          </Text>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            리뷰
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  image: {
    flex: 1,
    width,
    height: height * 0.27,
    backgroundColor: "red",
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    flex: 5,
    fontFamily: "Catch B ExtraBold",
    color: themeColors.primary,
  },
  subtitle: {
    fontWeight: "bold",
  },
  rating: {
    flex: 1.2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  interactions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
  },
  description: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  locationImage: {
    width: "100%",
    height: 210,
    resizeMode: "contain",
    marginBottom: 10,
  },
  detail: {
    color: "gray",
    marginTop: 5,
    marginBottom: 10,
  },
});
