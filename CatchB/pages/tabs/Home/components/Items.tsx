import { View, Text, Image, ScrollView } from "react-native";

import { MainHeading, SubHeading } from "./Headings";
import { itemStyles } from "./styles";
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
          style={itemStyles.image}
          source={require("../../../../assets/images/info1.jpg")}
        />
      );
    } else if (image_id === 2) {
      return (
        <Image
          style={itemStyles.image}
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
    <View style={itemStyles.container}>
      {renderImage(information.id)}
      <View style={itemStyles.textBox}>
        <Text style={itemStyles.title}>{information.title}</Text>
        <Text style={itemStyles.hashtags}>
          {formatHashtags(information.hashtags)}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={itemStyles.moreInfo}>{information.provider}</Text>
          <Text style={itemStyles.moreInfo}>{information.date}</Text>
        </View>
      </View>
    </View>
  );
}

export default function Items() {
    return (
      <>
        <MainHeading content="Catch B 핫정보!" />
        <SubHeading content="#캐치비추천템 #야구OOTD #요즘야구복 #야구배트" />
        <ScrollView style={{ flexDirection: "row" }} horizontal>
          <InfoSimple information={informations[0]} />
          <InfoSimple information={informations[1]} />
        </ScrollView>
      </>
    );
}

