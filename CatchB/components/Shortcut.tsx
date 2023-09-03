import { Text, View, StyleSheet, Image } from "react-native";

interface Props {
  imageNumber: number;
  title: string;
  description: string;
}

export default function Shortcut({ imageNumber, title, description}: Props) {
  const renderImage = (imageNumber: number) => {
    if (imageNumber === 1) {
      return (
        <Image
          style={styles.image}
          source={require("../assets/images/baseball_player.png")}
          />
      )
    }
    if (imageNumber === 2) {
      return (
        <Image
          style={styles.image}
          source={require("../assets/images/field.png")}
        />
      );
    } else return <></>;
  }
  return (
  <View style={styles.container}>
    {renderImage(imageNumber)}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f4e2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    marginHorizontal: 12,
  },
  image: {
    marginHorizontal: 30,
    marginTop: 20,
    width: 100,
    height: 100,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
  },
})
