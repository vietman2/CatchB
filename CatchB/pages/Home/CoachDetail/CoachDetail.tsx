import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import { HomeStackScreenProps } from "../../../containers/navigation";
import { styles } from "./styles";
import Images from "./components/Images";
import Buttons from "./components/Buttons";
import Cards from "./components/Cards";
import Information from "./components/Information";

export default function CoachDetail() {
  const route = useRoute<HomeStackScreenProps<"CoachDetail">["route"]>();
  const coach = route.params.coach;

  return (
    <View style={styles.container}>
      <Images />
      <View style={styles.information}>
        <Information coach={coach} />
        <Cards
          response_rate={coach.response_rate?.toString() + "%"}
          consults={coach.consults?.toString() + "명"}
          likes={coach.likes?.toString()}
        />
        <Buttons />
      </View>
    </View>
  );
}
