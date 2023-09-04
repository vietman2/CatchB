import { View, Text, StyleSheet, Image } from "react-native";
import { CircularButton } from "./Buttons";

interface Props {
  name: string;
  image_id: number;
}

export default function RecentVisit({ name, image_id }: Props) {
  const renderImage = (image_id: number) => {
    if (image_id === 1) {
      return (
        <Image
          style={styles.image}
          source={require("../assets/images/indoor1.jpg")}
        />
      );
    }
    if (image_id === 2) {
      return (
        <Image
          style={styles.image}
          source={require("../assets/images/indoor2.jpg")}
        />
      );
    } else return <></>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.facilityName}>{name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {renderImage(image_id)}
        <CircularButton text="예약" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
  },
  facilityName: {
    fontSize: 15,
    fontFamily: "KBO Dia Gothic_bold",
  },
  image: {
    width: 120,
    height: 60,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
    borderRadius: 40,
  },
});
