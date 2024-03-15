import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CheckStatus, ProgressBanner } from "./Progress";
import { MyStoreScreenProps } from ".constants/navigation";

export default function TaskBoard() {
  const navigation =
    useNavigation<MyStoreScreenProps<"MyStoreScreen">["navigation"]>();

  return (
    <>
      <ProgressBanner done={2} total={4} />
      <TouchableOpacity
        onPress={() => navigation.navigate("WorkProgress")}
        testID="WorkProgressTouchable"
      >
        <CheckStatus done={2} total={4} />
      </TouchableOpacity>
    </>
  );
}
