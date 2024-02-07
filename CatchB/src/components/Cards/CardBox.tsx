import { StyleSheet, Dimensions, View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

interface BoxProps {
  title: string;
  data: string;
  description: string;
  icon?: string;
  iconColor?: string;
}

export default function CardBox({
  title,
  data,
  description,
  icon,
  iconColor,
}: Readonly<BoxProps>) {
  return (
    <Card style={styles.box}>
      <Card.Content style={styles.content}>
        <Text variant="headlineSmall">{title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Icon source={icon} size={24} color={iconColor} />
          <Text variant="displaySmall">{data}</Text>
        </View>
        <Text variant="bodySmall">{description}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  box: {
    width: width * 0.42,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});
