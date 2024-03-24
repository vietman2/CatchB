import { useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";

import { Stats, TitleText } from "../fragments";
import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { LessonsTable } from ".components/Tables";
import { NearbyScreenProps } from ".constants/navigation";
import { CoachInfoDetailType } from ".constants/types/products";
import { getCoachDetail } from ".services/products";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { sampleLessonProducts } from "../../../variables/mvp_dummy_data/lessons";

const { width, height } = Dimensions.get("window");

function SimpleChip({ label }: Readonly<{ label: string }>) {
  return (
    <View style={styles.simpleChip}>
      <Text variant="titleMedium" style={styles.chipText}>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coach, setCoach] = useState<CoachInfoDetailType>();

  const [isLiked, setIsLiked] = useState(false);
  const [expand, setExpand] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "65%"], []);
  const navigation =
    useNavigation<NearbyScreenProps<"CoachDetail">["navigation"]>();
  const coachUuid = useSelector(
    (state: RootState) => state.coach.selectedCoachId
  );
  const products = sampleLessonProducts.filter(
    (product) => product.coach_uuid === "1"
  );

  const handleApply = () => {
    navigation.navigate("Payment");
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getCoachDetail(coachUuid);

      if (response.status !== 200) {
        setError(true);
      } else {
        setCoach(response.data);
        setError(false);
      }

      setLoading(false);
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: `${coach?.coach.name} ${"코치"}` });
  }, [coach]);

  const renderIntro = (intro: string) => {
    if (intro.length > 100) {
      return (
        <TouchableOpacity
          onPress={() => setExpand(!expand)}
          activeOpacity={0.6}
          testID="expand-collapse"
        >
          <Text variant="bodyLarge" style={styles.detail}>
            {expand ? intro : `${intro.slice(0, 100)}...`}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <Text variant="bodyLarge" style={styles.detail}>
          {intro}
        </Text>
      );
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <>
      <ScrollView style={styles.container}>
        <ScrollView horizontal pagingEnabled>
          {coach.images.map((image) => (
            <Image
              key={image.uri}
              source={0}
              src={image.uri}
              style={styles.image}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
        <View style={styles.topLine}>
          <TitleText title={coach.coach.name} is_coach />
          <Stats rating={0} like={isLiked} setLike={setIsLiked} />
        </View>
        <View style={styles.specialties}>
          <SimpleChip label="타격" />
          <SimpleChip label="주루" />
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            소개
          </Text>
          {renderIntro(coach.intro)}
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            가격표
          </Text>
          <LessonsTable products={products} />
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            주 활동 지역
          </Text>
          <View style={styles.regions}>
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
        backgroundStyle={styles.sheetBackground}
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
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  subtitle: {
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
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
  regions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  chipText: {
    color: "white",
  },
  specialties: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginHorizontal: 10,
  },
  sheetBackground: {
    backgroundColor: "rgb(245, 245, 245)",
  },
});
