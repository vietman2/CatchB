import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { cardStyles } from "../styles";

interface CardProps {
  title: string;
  description: string | undefined;
  icon: string;
}

const Card = ({ title, description, icon }: CardProps) => {
return (
  <View style={cardStyles.container}>
    <Text style={cardStyles.title}>{title}</Text>
    <Text style={cardStyles.description}>{description}</Text>
    <Ionicons
      name={icon}
      size={30}
      color="green"
      style={cardStyles.icon}
    />
  </View>
);
}

interface Props {
  response_rate: string | undefined;
  consults: string | undefined;
  likes: string | undefined;
}

export default function Cards({ response_rate, consults, likes }: Props) {
  return (
    <View style={cardStyles.cards}>
      <Card title="응답률" description={response_rate} icon="paper-plane" />
      <Card title="채팅 상담" description={consults} icon="chatbox-ellipses" />
      <Card title="좋아요" description={likes} icon="heart" />
    </View>
  );
}
