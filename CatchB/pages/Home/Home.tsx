import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import Search from "../../components/Search";
import { RootTabParamList } from "../../containers/TabContainer";

type HomeProps = BottomTabScreenProps<RootTabParamList, "Home">;

export default function Home({ navigation }: HomeProps) {
  return (
    <View style={{ flex:1, backgroundColor: "#fff" }}>
      <Search />
    </View>
  );
}
