import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { styles } from "../containers/styles";
import Images from "../containers/Images";
import Information from "../containers/FacilityInformation";
import Cards from "../containers/Cards";
import { ToggleButton } from "../components/Buttons";
import { HomeStackScreenProps } from "../variables/navigation";

export default function FacilityDetail() {
  const route = useRoute<HomeStackScreenProps<"FacilityDetail">["route"]>();
  const facility = route.params.facility;

  return (
    <View style={styles.container}>
      <Images />
      <View style={styles.information}>
        <Information facility={facility} />
        <Cards
          response_rate={facility.response_rate?.toString() + "%"}
          consults={facility.consults?.toString() + "명"}
          likes={facility.likes?.toString()}
        />
        <ToggleButton />
      </View>
    </View>
  );
}
