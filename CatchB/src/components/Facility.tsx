import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { FacilityInfoType } from "../variables/types";
import { HomeStackScreenProps } from "../variables/navigation";
import { facilityStyles } from "./styles";

interface Props {
  facility: FacilityInfoType;
}

const imageSources: { [key: number]: ImageSourcePropType } = {
  1: require("assets/images/facility1.png"),
  2: require("assets/images/facility2.jpg"),
  3: require("assets/images/indoor1.jpg"),
  4: require("assets/images/indoor2.jpg"),
};

const renderImage = (image_id: number) => {
  const source: ImageSourcePropType = imageSources[image_id];

  if (source) {
    if (image_id <= 2) {
      return <Image style={facilityStyles.imageLarge} source={source} />;
    } else {
      return <Image style={facilityStyles.imageSmall} source={source} />;
    }
  } else {
    return <></>;
  }
};

export const FacilityLarge = ({ facility }: Props) => {
  const navigation =
    useNavigation<HomeStackScreenProps<"FacilityDetail">["navigation"]>();

  return (
    <View style={facilityStyles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FacilityDetail", { facility: facility })
        }
        testID="facility-large"
      >
        {renderImage(facility.id)}
        <View style={facilityStyles.textBox}>
          <Text style={facilityStyles.text}>{facility.name}</Text>
          <Text style={facilityStyles.address}>{facility.address}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const FacilitySmall = ({ facility }: Props) => {
  const navigation =
    useNavigation<HomeStackScreenProps<"FacilityDetail">["navigation"]>();

  return (
    <View style={facilityStyles.recentContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FacilityDetail", { facility: facility })
        }
        testID="facility-small"
      >
        <Text style={facilityStyles.boldText}>{facility.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {renderImage(facility.id)}
          <TouchableOpacity style={facilityStyles.button} onPress={() => {}}>
            <Text style={facilityStyles.buttonText}>예약</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
