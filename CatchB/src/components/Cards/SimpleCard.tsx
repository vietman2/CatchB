import { StyleSheet } from "react-native";
import { Card, Icon } from "react-native-paper";

interface CardProps {
  children: React.ReactNode;
  title: string;
  icon: string;
}

export default function SimpleCard({ children, title, icon }: CardProps) {
  return (
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
}

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
});
