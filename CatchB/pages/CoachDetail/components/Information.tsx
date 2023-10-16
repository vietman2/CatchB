import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { styles } from "../../styles";
import { CoachInfoType } from "../../../variables/types";

interface Props {
  coach: CoachInfoType;
}

export default function Information({ coach }: Props) {
  const academic_age = () => {
    return `${4}년제 졸업 / ${30}대`;
  };

  const renderDescription = () => {
    if (coach.career === null || coach.career === undefined) {
      return "경력이 없습니다.";
    }

    const descriptionText = [];

    for (let i = 0; i < coach.career.length; i++) {
      descriptionText.push(
        <Text key={i} style={styles.descriptionText}>
          {"\u2022 "}
          {coach.career[i]}
        </Text>
      );

      if (i !== coach.career.length - 1) {
        descriptionText.push(<Text key={i + 100}>{"\n"}</Text>);
      }
    }

    return descriptionText;
  };

  const BasicInfo = () => {
    return (
      <View style={styles.basicInfo}>
        <Text style={styles.age}>{academic_age()}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={20} color="yellow" />
          <Text style={styles.ratingText}>
            {" "}
            {coach.rating} / 최근 상담 {coach.num_reviews}
          </Text>
        </View>
      </View>
    );
  };

  const FirstLine = () => {
    return (
      <View style={styles.firstLine}>
        <Text style={styles.name}>{coach.name} 코치</Text>
        <Text style={styles.price}>{coach.price}원 / 1시간</Text>
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
