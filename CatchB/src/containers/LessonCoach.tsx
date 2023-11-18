import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { HomeStackScreenProps } from "../variables/navigation";
import { CoachInfoType } from "../variables/types";

import { coachStyles } from "../components/styles";

interface Props {
  coach: CoachInfoType;
}

export default function LessonCoach({ coach }: Props) {
  const navigation =
    useNavigation<HomeStackScreenProps<"CoachDetail">["navigation"]>();

  const renderImage = (image_id: number) => {
    if (image_id === 1) {
      return (
        <Image
          style={coachStyles.image}
          source={require("assets/images/LSY.jpg")}
        />
      );
    } else if (image_id === 2) {
      return (
        <Image
          style={coachStyles.image}
          source={require("assets/images/PCH.png")}
        />
      );
    } else {
      return (
        <Image
          style={coachStyles.image}
          source={require("assets/images/LDH.jpg")}
        />
      );
    }
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
