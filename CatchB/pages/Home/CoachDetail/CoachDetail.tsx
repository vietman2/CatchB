import { View, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { HomeStackScreenProps } from "../../../containers/navigation";
import { styles } from "./styles";
import Card from "./Card";

export default function CoachDetail() {
  const route = useRoute<HomeStackScreenProps<"CoachDetail">["route"]>();
  const coach = route.params.coach;

  const renderImages = (id: number) => {
    const images = [];

    for (let i = 0; i < 5; i++) {
      images.push(
        <View
          key={i}
          style={{
            width: "100%",
            height: 300,
            backgroundColor: "gray",
            margin: 10,
          }}
        />
      );
    }

    return images;
  };

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
          {coach.career[i]}
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
      <ScrollView style={styles.images} pagingEnabled horizontal>
        {renderImages(coach.id)}
      </ScrollView>
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
          <Card title="응답률" description={coach.response_rate} icon="paper-plane" />
          <Card title="채팅 상담" description={coach.consults} icon="chatbox-ellipses" />
          <Card title="좋아요" description={coach.likes} icon="heart" />
        </View>
      </View>
    </View>
  );
}


