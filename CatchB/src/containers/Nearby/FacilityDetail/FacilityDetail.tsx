import { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Button, Icon, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";

import { AvatarIcon } from ".components/Profile";
import { TimeBar, ReservationsTable } from ".components/Tables";
import { NearbyScreenProps } from ".constants/navigation";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { reservationProducts } from "../../../variables/mvp_dummy_data/reservations";

const { width, height } = Dimensions.get("window");

function ProductPicker() {
  return (
    <TouchableOpacity style={styles.picker}>
      <Text variant="titleMedium">1시간 예약</Text>
      <Icon source="chevron-down" size={20} />
    </TouchableOpacity>
  );
}

function DateTimePicker() {
  return (
    <TouchableOpacity style={styles.picker}>
      <Text variant="titleMedium">오후 5시 ~ 오후 6시</Text>
      <Icon source="chevron-down" size={20} />
    </TouchableOpacity>
  );
}

function CoachProfilePlaceholder({ name }: Readonly<{ name: string }>) {
  return (
    <View style={styles.placeholderContainer}>
      <AvatarIcon />
      <Text>{name}</Text>
    </View>
  );
}

export default function FacilityDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [expand, setExpand] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "65%"], []);
  const navigation =
    useNavigation<NearbyScreenProps<"FacilityDetail">["navigation"]>();
  const facility = useSelector(
    (state: RootState) => state.facility.selectedFacility
  );

  const handleReserve = () => {
    navigation.navigate("FacilityReserve", {
      selectedDate: "2024-02-13",
      selectedTime: "오후 5시 ~ 오후 6시",
      selectedProduct: reservationProducts[3],
    });
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
          {facility.description}
        </Text>
      );
    }
  };

  const renderDate = () => {
    // today's date in M월 D일 format
    const dateToday = new Date();
    const monthString = dateToday.getMonth() + "월 ";
    const dateString = dateToday.getDate() + "일 ";

    return monthString + dateString;
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
            {facility.name}
          </Text>
          <View style={styles.rating}>
            <Icon source="star" size={20} color="gold" />
            <Text>{facility.rating}/10</Text>
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
          {facility.bulletPoints.map((bulletPoint) => (
            <Text key={bulletPoint} variant="bodyLarge">
              {"\u2022"} {bulletPoint}
            </Text>
          ))}
          {renderDescription(facility.description)}
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            코치진
          </Text>
          <ScrollView horizontal>
            <CoachProfilePlaceholder name="김감독" />
            <CoachProfilePlaceholder name="이코치" />
            <CoachProfilePlaceholder name="박코치" />
            <CoachProfilePlaceholder name="최코치" />
            <CoachProfilePlaceholder name="김코치" />
          </ScrollView>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            가격표
          </Text>
          <ReservationsTable products={facility.products} />
        </View>
        <View style={styles.content}>
          <View style={styles.reservation}>
            <Text variant="titleLarge" style={styles.subtitle}>
              예약 현황
            </Text>
            <Text variant="titleMedium">자세히 보기</Text>
          </View>
          <View style={styles.reservation}>
            <Text variant="titleMedium">{renderDate()}</Text>
            <Text variant="titleMedium">다른 날짜 선택</Text>
          </View>
          <TimeBar />
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            위치
          </Text>
          <Text variant="titleMedium" style={styles.detail}>
            {facility.location}
          </Text>
          <Image
            source={require("assets/images/seouldae.jpeg")}
            style={styles.locationImage}
          />
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
          예약하기
        </Text>
        <Text variant="titleMedium" style={styles.detail}>
          상품 선택
        </Text>
        <ProductPicker />
        <Text variant="titleMedium" style={styles.detail}>
          시간 선택
        </Text>
        <DateTimePicker />
        <View style={styles.button}>
          <Button
            mode="contained"
            onPress={handleReserve}
            testID="reserve-button"
          >
            예약하기
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
  placeholderContainer: {
    alignItems: "center",
    marginRight: 15,
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
  bottomSheet: {
    paddingHorizontal: 20,
  },
  reservation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
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
});
