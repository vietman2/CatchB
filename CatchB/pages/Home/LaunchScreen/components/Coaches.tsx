import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { MainHeading } from "./Headings";
import { coachStyles } from "./styles";
import { HomeStackScreenProps } from "../../../../containers/navigation";
import { CoachInfoType } from "../../../../variables/types";
import { coaches } from "../../../../variables/dummydata";

interface Props {
  coach: CoachInfoType;
}

const CoachSimple = ({ coach }: Props) => {
  const navigation =
    useNavigation<HomeStackScreenProps<"CoachDetail">["navigation"]>();

  const renderImage = (image_id: number) => {
    if (image_id === 1) {
      return (
        <Image
          style={coachStyles.image}
          source={require("../../../../assets/images/LSY.jpg")}
        />
      );
    } else if (image_id === 2) {
      return (
        <Image
          style={coachStyles.image}
          source={require("../../../../assets/images/PCH.png")}
        />
      );
    } else if (image_id === 3) {
      return (
        <Image
          style={coachStyles.image}
          source={require("../../../../assets/images/LDH.jpg")}
        />
      );
    } else return <></>;
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={coachStyles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CoachDetail", { coach: coach })}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {renderImage(coach.id)}
        </View>
        <View style={coachStyles.firstLine}>
          <Text style={coachStyles.title}>{coach.name} 코치</Text>
          <Ionicons name="star" size={16} color="orange" />
          <Text style={coachStyles.rating}>{coach.rating.toFixed(1)}</Text>
          <Text style={coachStyles.reviewCount}> ({coach.num_reviews})</Text>
        </View>
        <Text style={coachStyles.location}>{coach.location}</Text>
        <Text style={coachStyles.price}>
          {formatPrice(coach.price)}원 / 1시간
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Coaches() {
    return (
      <>
        <MainHeading content="우리 동네 추천 레슨 코치!" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <CoachSimple coach={coaches[0]} />
          <CoachSimple coach={coaches[2]} />
          <CoachSimple coach={coaches[1]} />
        </ScrollView>
      </>
    );
}

