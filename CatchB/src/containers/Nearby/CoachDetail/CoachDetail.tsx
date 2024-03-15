import { useMemo, useRef, useState } from "react";
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
import BottomSheet from "@gorhom/bottom-sheet";

import { LessonProductsTable } from "../../../components/Tables";
import { themeColors } from ".themes/colors";
import { sampleLessonProducts } from "../../../variables/mvp_dummy_data/lessons";
import { NearbyScreenProps } from ".constants/navigation";
import { RootState } from ".store/index";

const { width, height } = Dimensions.get("window");

function SimpleChip({ label }: Readonly<{ label: string }>) {
  return (
    <View style={styles.simpleChip}>
      <Text variant="titleMedium" style={{ color: "white" }}>
        {label}
      </Text>
    </View>
  );
}

function ProductPicker() {
  return (
    <TouchableOpacity style={styles.picker}>
      <Text variant="titleMedium">타격 레슨: 선수지망생</Text>
      <Icon source="chevron-down" size={20} />
    </TouchableOpacity>
  );
}

export default function CoachDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [expand, setExpand] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "65%"], []);
  const navigation =
    useNavigation<NearbyScreenProps<"CoachDetail">["navigation"]>();
  const coach = useSelector((state: RootState) => state.coach.selectedCoach);
  const products = sampleLessonProducts.filter(
    (product) => product.coach_uuid === coach.coach_uuid
  );

  const handleApply = () => {
    navigation.navigate("Payment");
  };

  const renderDescription = (description: string) => {
    if (description.length > 100) {
      return (
        <TouchableOpacity
          onPress={() => setExpand(!expand)}
          activeOpacity={0.6}
          testID="expand-collapse"
        >
          <Text variant="bodyLarge" style={styles.detail}>
            {expand ? description : `${description.slice(0, 100)}...`}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text variant="bodyLarge" style={styles.detail}>
          {description}
        </Text>
      );
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
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
          {renderDescription(coach.description)}
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            전문 분야
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
          >
            <SimpleChip label="타격" />
            <SimpleChip label="주루" />
          </View>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            가격표
          </Text>
          <LessonProductsTable products={products} />
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            주 활동 지역
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 5 }}
          >
            <SimpleChip label="서울 관악구" />
            <SimpleChip label="인천 서구" />
          </View>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            리뷰
          </Text>
        </View>
        <View style={styles.placeholder} />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
        backgroundStyle={{ backgroundColor: "rgb(245, 245, 245)" }}
      >
        <Text variant="titleLarge" style={styles.subtitle}>
          신청하기
        </Text>
        <Text variant="titleMedium" style={styles.detail}>
          상품 선택
        </Text>
        <ProductPicker />
        <View style={styles.button}>
          <Button mode="contained" onPress={handleApply} testID="apply-button">
            신청하기
          </Button>
        </View>
      </BottomSheet>
    </>
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
  button: {
    marginTop: 20,
  },
  bottomSheet: {
    paddingHorizontal: 20,
  },
  placeholder: {
    height: 100,
  },
  picker: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  simpleChip: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: themeColors.primary,
    borderRadius: 10,
    margin: 5,
  },
});
