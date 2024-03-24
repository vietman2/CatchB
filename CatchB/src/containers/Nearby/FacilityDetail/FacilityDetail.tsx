import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Avatar, Button, Icon, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";

import { Stats, TitleText } from "../fragments";
import { ErrorPage } from ".components/Error";
import { LoadingPage } from ".components/Loading";
import { TimeBar } from ".components/Tables";
import { NearbyScreenProps } from ".constants/navigation";
import { getFacilityDetail } from ".services/products";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";
import { FacilityInfoDetailType } from ".types/products";
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

function CoachProfile({
  name,
  profile,
}: Readonly<{ name: string; profile: string }>) {
  return (
    <View style={styles.profileContainer}>
      <Avatar.Image
        source={{ uri: profile }}
        style={styles.profileImage}
        size={64}
      />
      <Text>{name}</Text>
    </View>
  );
}

export default function FacilityDetail() {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [facility, setFacility] = useState<FacilityInfoDetailType>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "65%"], []);
  const navigation =
    useNavigation<NearbyScreenProps<"FacilityDetail">["navigation"]>();
  const facilityUuid = useSelector(
    (state: RootState) => state.facility.selectedFacilityId
  );

  const handleReserve = () => {
    navigation.navigate("FacilityReserve", {
      selectedDate: "2024-02-13",
      selectedTime: "오후 5시 ~ 오후 6시",
      selectedProduct: reservationProducts[3],
    });
  };

  const renderDescription = () => {
    return (
      <Text variant="bodyLarge" style={styles.detail}>
        {facility.intro}
      </Text>
    );
  };

  const renderDate = () => {
    // today's date in M월 D일 format
    const dateToday = new Date();
    const monthString = dateToday.getMonth() + "월 ";
    const dateString = dateToday.getDate() + "일 ";

    return monthString + dateString;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await getFacilityDetail(facilityUuid);

      if (response.status !== 200) {
        setError(true);
      } else {
        setFacility(response.data);
        setError(false);
      }
      setLoading(false);
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: facility?.facility.name });
  }, [facility]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <>
      <ScrollView style={styles.container}>
        <ScrollView horizontal pagingEnabled>
          {facility.images.map((image, index) => (
            <Image
              key={index}
              source={0}
              src={image.uri}
              style={styles.image}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
        <View style={styles.topLine}>
          <TitleText title={facility.facility.name} />
          <Stats rating={0} like={isLiked} setLike={setIsLiked} />
        </View>
        <View style={styles.description}>{renderDescription()}</View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            코치진
          </Text>
          <ScrollView horizontal>
            {facility.coaches.map((coach, index) => (
              <CoachProfile
                key={index}
                name={coach.name}
                profile={coach.profile}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            가격표
          </Text>
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
            {facility.facility.address}
          </Text>
          <Image
            source={0}
            src={facility.facility.map_image}
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
        backgroundStyle={styles.sheetBackground}
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
  profileContainer: {
    alignItems: "center",
    marginRight: 15,
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
  title: {
    flex: 5,
    fontFamily: "Catch B ExtraBold",
    color: themeColors.primary,
  },
  subtitle: {
    fontWeight: "bold",
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
  profileImage: {
    marginVertical: 16,
  },
  sheetBackground: {
    backgroundColor: "rgb(245, 245, 245)",
  },
});
