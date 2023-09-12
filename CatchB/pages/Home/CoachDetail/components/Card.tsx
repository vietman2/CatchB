import { Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { cardStyles } from "../styles";

interface CardProps {
  title: string;
  description: string | undefined;
  icon: string;
}

export default function Card(props: CardProps) {
  return (
    <View style={cardStyles.container}>
      <Text style={cardStyles.title}>{props.title}</Text>
      <Text style={cardStyles.description}>{props.description}</Text>
      <Ionicons
        name={props.icon}
        size={30}
        color="green"
        style={cardStyles.icon}
      />
    </View>
  );
}
