import { ScrollView } from "react-native";

import { MainHeading, SubHeading } from "../components/Heading";
import { facilities } from "../variables/dummydata";
import { FacilityLarge } from "../components/Facility";

export default function RecommendedFacilities() {
  return (
    <>
      <MainHeading content="나에게 딱 맞는, 캐치B 추천" />
      <SubHeading content="캐치B가 추천하는 레슨장" />
      <ScrollView style={{ flexDirection: "row" }} horizontal>
        <FacilityLarge facility={facilities[0]} />
        <FacilityLarge facility={facilities[1]} />
      </ScrollView>
    </>
  );
}
