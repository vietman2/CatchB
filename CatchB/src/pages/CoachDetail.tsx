import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { HomeStackScreenProps } from "../variables/navigation";
import Images from "../containers/Images";
import Cards from "../containers/Cards";
import { ToggleButton } from "../components/Buttons";
import Information from "../containers/CoachInformation";
import { styles } from "../containers/styles";

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
        <ToggleButton />
      </View>
    </View>
  );
}
