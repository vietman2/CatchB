import { StyleSheet, Dimensions, View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

interface CardProps {
  children: React.ReactNode;
  title: string;
  icon: string;
}

export const SimpleCard = ({ children, title, icon }: CardProps) => (
  <Card style={styles.card}>
    <Card.Title
      title={title}
      titleVariant="headlineSmall"
      titleStyle={styles.title}
      left={() => <Icon source={icon} size={24} />}
      leftStyle={{ marginRight: 0 }}
    />
    {children}
  </Card>
);

interface BoxProps {
  title: string;
  data: string;
  description: string;
  icon?: string;
  iconColor?: string;
}

export const Box = ({ title, data, description, icon, iconColor }: BoxProps) => (
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

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    paddingBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginTop: 4,
  },
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
