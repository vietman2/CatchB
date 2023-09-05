import { View, Text, StyleSheet, Image } from "react-native";
import { InformationType } from "../../variables/types";

interface Props {
  information: InformationType;
}

export default function InfoSimple({ information }: Props) {
  const renderImage = (image_id: number) => {
    if (image_id === 1) {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/images/info1.jpg")}
        />
      );
    } else if (image_id === 2) {
      return (
        <Image
          style={styles.image}
          source={require("../../assets/images/info2.jpg")}
        />
      );
    } else return <></>;
  };

  const formatHashtags = (hashtags: string[]) => {
    let line = "";

    for (let i = 0; i < hashtags.length; i++) {
      line += "#" + hashtags[i] + " ";
    }

    return line;
  };

  return (
    <View style={styles.container}>
      {renderImage(information.id)}
      <View style={styles.textBox}>
        <Text style={styles.title}>{information.title}</Text>
        <Text style={styles.hashtags}>
          {formatHashtags(information.hashtags)}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.moreInfo}>{information.provider}</Text>
        <Text style={styles.moreInfo}>{information.date}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textBox: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 20,
  },
  title: {
    marginTop: 4,
    fontSize: 16,
    padding: 6,
    fontFamily: "KBO Dia Gothic_bold",
  },
  hashtags: {
    fontSize: 12,
    padding: 6,
    fontFamily: "KBO Dia Gothic_bold",
    marginBottom: 4,
  },
  image: {
    width: 180,
    height: 240,
    resizeMode: "cover",
    borderRadius: 20,
  },
  moreInfo: {
    fontSize: 12,
    padding: 6,
    fontFamily: "KBO Dia Gothic_bold",
    marginBottom: 4,
    color: "gray",
  },
});
