import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { styles } from "./styles";
import { FacilityInfoType } from "../variables/types";

interface Props {
  facility: FacilityInfoType;
}

export default function Information({ facility }: Props) {
  const renderDescription = () => {
    if (facility.description === null || facility.description === undefined) {
      return "설명이 없습니다.";
    }

    const descriptionText = [];

    for (let i = 0; i < facility.description.length; i++) {
      descriptionText.push(
        <Text key={i} style={styles.descriptionText}>
          {"\u2022 "}
          {facility.description[i]}
        </Text>
      );

      if (i !== facility.description.length - 1) {
        descriptionText.push(<Text key={i + 100}>{"\n"}</Text>);
      }
    }

    return descriptionText;
  };

  const BasicInfo = () => {
    return (
      <View style={styles.basicInfo}>
        <Text style={styles.age}>{facility.address}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={20} color="yellow" />
          <Text style={styles.ratingText}>
            {" "}
            {facility.rating} / 최근 상담 {facility.num_reviews}
          </Text>
        </View>
      </View>
    );
  };

  const FirstLine = () => {
    return (
      <View style={styles.firstLine}>
        <Text style={styles.name}>{facility.name}</Text>
        <Text style={styles.price}>{facility.price}원 / 1시간</Text>
      </View>
    );
  };

  const Description = () => {
    return (
      <View style={styles.description}>
        <Text style={styles.descriptionText}>{renderDescription()}</Text>
      </View>
    );
  };

  return (
    <>
      <BasicInfo />
      <FirstLine />
      <Description />
    </>
  );
}
