import { View, Text, Image, ImageSourcePropType } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { searchBoxStyles, cardStyles } from "./styles";

interface CardProps {
  imageNumber: number;
  title: string;
  description: string;
}

const Card = ({ imageNumber, title, description }: CardProps) => {
  const imageSources: { [key: number]: ImageSourcePropType } = {
    1: require("../../../../assets/images/baseball_player.png"),
    2: require("../../../../assets/images/field.png"),
  };

  const renderImage = (imageNumber: number) => {
    const source: ImageSourcePropType = imageSources[imageNumber];

    if (source) {
      return <Image style={cardStyles.image} source={source} />;
    } else {
      return <></>;
    }
  };
  return (
    <View style={cardStyles.container}>
      {renderImage(imageNumber)}
      <Text style={cardStyles.title}>{title}</Text>
      <Text style={cardStyles.description}>{description}</Text>
    </View>
  );
};

const Cards = () => {
  return (
    <View style={cardStyles.cards}>
      <Card
        imageNumber={1}
        title="레슨"
        description={"우리 동네 야구레슨\n가격비교"}
      />
      <Card
        imageNumber={2}
        title="대관"
        description={"근처 야구 실내 연습장\n간편 예약"}
      />
    </View>
  );
};

const SearchBox = () => {
  return (
    <View style={searchBoxStyles.container}>
      <View style={searchBoxStyles.searchArea}>
        <View style={searchBoxStyles.textBox}>
          <Text style={searchBoxStyles.text}>검색</Text>
        </View>
        <Ionicons
          style={searchBoxStyles.icon}
          name="search-outline"
          size={20}
          color="black"
        />
      </View>
      <View style={searchBoxStyles.space} />
    </View>
  );
};

const Ads = () => {
  return (
    <View style={cardStyles.ads}>
      <Text style={{ fontSize: 30, color: "yellow" }}>광고</Text>
    </View>
  );
};

export default function Dashboard() {
  return (
    <View>
      <SearchBox />
      <Cards />
      <Ads />
    </View>
  );
}
