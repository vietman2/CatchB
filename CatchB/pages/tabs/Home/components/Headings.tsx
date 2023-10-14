import { View, Text } from "react-native";

import { headingStyles as styles } from "./styles";

interface Props {
    content: string;
}

export const MainHeading = ({ content }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.mainContainer}>
        <Text style={styles.mainHeading}>{content}</Text>
      </View>
    </View>
  );
}

export const SubHeading = ({ content }: Props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>{content}</Text>
      </View>
    </View>
  );
}

