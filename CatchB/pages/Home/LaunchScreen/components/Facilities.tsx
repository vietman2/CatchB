import { View, Text, Image, ImageSourcePropType, TouchableOpacity, ScrollView } from "react-native";

import { MainHeading, SubHeading } from "./Headings";
import { FacilityInfoType } from "../../../../variables/types";
import { facilityStyles } from "./styles";
import { facilities } from "../../../../variables/dummydata";

const imageSources: { [key: number]: ImageSourcePropType } = {
  1: require("../../../../assets/images/facility1.png"),
  2: require("../../../../assets/images/facility2.jpg"),
  3: require("../../../../assets/images/indoor1.jpg"),
  4: require("../../../../assets/images/indoor2.jpg"),
};

const renderImage = (image_id: number) => { 
  const source: ImageSourcePropType = imageSources[image_id];

  if (source) {
    if (image_id <= 2) {
        return <Image style={facilityStyles.imageLarge} source={source} />;
    }
    else {
        return <Image style={facilityStyles.imageSmall} source={source} />;
    }
  } else {
    return <></>;
  }
};

interface Props {
  facility: FacilityInfoType;
}

const FacilitySmall = ({ facility }: Props) => {
  return (
    <View style={facilityStyles.recentContainer}>
      <Text style={facilityStyles.boldText}>{facility.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {renderImage(facility.id)}
        <TouchableOpacity style={facilityStyles.button} onPress={() => {}}>
            <Text style={facilityStyles.buttonText}>예약</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RecentFacility = () => {
  return (
    <View>
      <MainHeading content="최근 본 시설" />
      <ScrollView style={{ flexDirection: "row" }} horizontal>
        <FacilitySmall facility={facilities[2]} />
        <FacilitySmall facility={facilities[3]} />
      </ScrollView>
    </View>
  )
}

const FacilityLarge = ({ facility }: Props) => {
  return (
    <View style={facilityStyles.container}>
      {renderImage(facility.id)}
      <View style={facilityStyles.textBox}>
        <Text style={facilityStyles.text}>{facility.name}</Text>
        <Text style={facilityStyles.address}>{facility.address}</Text>
      </View>
    </View>
  );
}

const RecommendedFacility = () => {
  return (
  <View>
    <MainHeading content="나에게 딱 맞는, 캐치B 추천" />
      <SubHeading content="캐치B가 추천하는 레슨장" />
      <ScrollView style={{ flexDirection: "row" }} horizontal>
        <FacilityLarge facility={facilities[0]} />
        <FacilityLarge facility={facilities[1]} />
      </ScrollView>
    </View>
  )
}

export default function Facilities() {
  return (
    <View>
      <RecentFacility />
      <RecommendedFacility />
    </View>
  );
}
