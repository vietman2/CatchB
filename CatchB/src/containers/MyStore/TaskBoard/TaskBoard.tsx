import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  CheckStatus,
  ProgressBanner,
} from "./Progress";
import { MyStoreStackScreenProps } from "../../../variables/navigation";

export default function TaskBoard() {
  const navigation =
    useNavigation<MyStoreStackScreenProps<"MyStoreScreen">["navigation"]>();

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
