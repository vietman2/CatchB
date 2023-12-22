import { TouchableOpacity } from "react-native";
import { CheckStatus, ProgressBanner } from "../../components/ProgressBar/Progress";
import { useNavigation } from "@react-navigation/native";
import { MyStoreStackScreenProps } from "../../variables/navigation";

export default function TaskBoard() {
  const navigation =
    useNavigation<MyStoreStackScreenProps<"MyStoreScreen">["navigation"]>();

  return (
    <>
      <ProgressBanner done={2} total={4} />
      <TouchableOpacity onPress={() => navigation.navigate("WorkProgress")}>
        <CheckStatus done={2} total={4} />
      </TouchableOpacity>
    </>
  );
}
