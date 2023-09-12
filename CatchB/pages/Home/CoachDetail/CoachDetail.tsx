import { useState } from "react";
import { View, Text, Switch } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { HomeStackScreenProps } from "../../../containers/navigation";
import { styles } from "./styles";
import Card from "./components/Card";
import Images from "./components/Images";

export default function CoachDetail() {
  const route = useRoute<HomeStackScreenProps<"CoachDetail">["route"]>();
  const coach = route.params.coach;
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const toggleSwitch = () => setIsLiked((previousState) => !previousState);

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
          {"\u2022 "}{coach.career[i]}
        </Text>
      );

      if (i !== coach.career.length - 1) {
        descriptionText.push(<Text key={i + 100}>{"\n"}</Text>);
      }
    }

    return descriptionText;
  };

  return (
    <View style={styles.container}>
      <Images />
      <View style={styles.information}>
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
        <View style={styles.detailInfo}></View>
        <View style={styles.firstLine}>
          <Text style={styles.name}>{coach.name} 코치</Text>
          <Text style={styles.price}>{coach.price}원 / 1시간</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{renderDescription()}</Text>
        </View>
        <View style={styles.cards}>
          <Card
            title="응답률"
            description={coach.response_rate?.toString() + "%"}
            icon="paper-plane"
          />
          <Card
            title="채팅 상담"
            description={coach.consults?.toString() + "명"}
            icon="chatbox-ellipses"
          />
          <Card title="좋아요" description={coach.likes?.toString()} icon="heart" />
        </View>
        <View style={styles.buttons}>
          <Switch 
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isLiked}
          />
          <View style={styles.chatButton}>
            <Ionicons name="checkmark-done" size={20} color="green" />
            <Text style={styles.chatText}>1:1 채팅 상담</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
