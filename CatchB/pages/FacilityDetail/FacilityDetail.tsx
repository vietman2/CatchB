import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { styles } from "../styles";
import Images from "./components/Images";
import Information from "./components/Information";
import Cards from "./components/Cards";
import Buttons from "./components/Buttons";
import { HomeStackScreenProps } from "../../containers/navigation";

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
        <Buttons />
      </View>
    </View>
  );
}
