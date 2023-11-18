import { ScrollView } from "react-native";

import { MainHeading } from "../components/Heading";
import { facilities } from "../variables/dummydata";
import { FacilitySmall } from "../components/Facility";

export default function RecentFacilities() {
  return (
    <>
      <MainHeading content="최근 본 시설" />
      <ScrollView style={{ flexDirection: "row" }} horizontal>
        <FacilitySmall facility={facilities[2]} />
        <FacilitySmall facility={facilities[3]} />
      </ScrollView>
    </>
  );
}
