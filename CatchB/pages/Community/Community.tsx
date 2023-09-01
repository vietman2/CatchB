import { View, Text } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../containers/TabContainer";

type CommunityProps = BottomTabScreenProps<RootTabParamList, "Community">;

export default function Community({ navigation }: CommunityProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>커뮤니티 화면</Text>
    </View>
  );
}
