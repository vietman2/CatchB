import { View } from "react-native";
import { Icon } from "react-native-paper";

interface Props {
  canUpload?: boolean;
}

export default function ImagePlaceholder({ canUpload }: Readonly<Props>) {
  canUpload = canUpload ? canUpload : false;

  return (
    <View
      style={{
        width: 120,
        height: 120,
        backgroundColor: "silver",
        marginRight: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {canUpload ? <Icon source="plus" size={20} /> : null}
    </View>
  );
}
