import { useState } from "react";
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

import ScheduleBar from "../../../components/Tables/ScheduleBar";
import ProductsTable from "../../../components/Tables/ProductsTable";
import CoachProfile from "../../../components/Avatar/CoachProfile";
import { themeColors } from "../../../variables/colors";
import { RootState } from "../../../store/store";
import { NearbyStackScreenProps } from "../../../variables/navigation";

const { width, height } = Dimensions.get("window");

export default function FacilityDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [expand, setExpand] = useState(false);
  const navigation =
    useNavigation<NearbyStackScreenProps<"FacilityDetail">["navigation"]>();
  const facility = useSelector(
    (state: RootState) => state.facility.selectedFacility
  );

  const handleReserve = () => {
    navigation.navigate("FacilityReserve");
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
          {facility.description}
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
          {facility.bulletPoints.map((bulletPoint, index) => (
            <Text key={index} variant="bodyLarge">
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
            <CoachProfile name="김감독" />
            <CoachProfile name="이코치" />
            <CoachProfile name="박코치" />
            <CoachProfile name="최코치" />
            <CoachProfile name="김코치" />
          </ScrollView>
        </View>
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.subtitle}>
            가격표
          </Text>
          <ProductsTable products={facility.products} />
        </View>
        <View style={styles.content}>
          <View style={styles.reservation}>
            <Text variant="titleLarge" style={styles.subtitle}>
              예약 현황
            </Text>
            <Text variant="titleMedium">자세히 보기</Text>
          </View>
          <ScheduleBar />
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
      </ScrollView>
      <View style={styles.button}>
        <Button mode="contained" onPress={handleReserve}>
          예약하기
        </Button>
      </View>
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
  reservation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  button: {
    marginTop: 20,
  },
});
