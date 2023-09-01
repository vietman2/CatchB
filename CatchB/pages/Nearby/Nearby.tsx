import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../containers/TabContainer";

type NearbyProps = BottomTabScreenProps<RootTabParamList, "Nearby">;

export default function Nearby({ navigation }: NearbyProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>내 주변 화면</Text>
    </View>
  );
}
