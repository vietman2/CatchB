import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import { MainHeading, SubHeading } from "./Headings";
import { InformationType } from "../../../../variables/types";
import { informations } from "../../../../variables/dummydata";

interface Props {
  information: InformationType;
}

const InfoSimple = ({ information }: Props) => {
  const renderImage = (image_id: number) => {
    if (image_id === 1) {
      return (
        <Image
          style={styles.image}
          source={require("../../../../assets/images/info1.jpg")}
        />
      );
    } else if (image_id === 2) {
      return (
        <Image
          style={styles.image}
          source={require("../../../../assets/images/info2.jpg")}
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

export default function Items() {
    return (
      <View>
        <MainHeading content="Catch B 핫정보!" />
        <SubHeading content="#캐치비추천템 #야구OOTD #요즘야구복 #야구배트" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <InfoSimple information={informations[0]} />
          <InfoSimple information={informations[1]} />
        </ScrollView>
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
