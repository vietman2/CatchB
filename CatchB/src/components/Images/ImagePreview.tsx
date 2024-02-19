import { View, ImageBackground, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";

interface Props {
  uri: string;
  removeImage: () => void;
}

export default function ImagePreview({ uri, removeImage }: Readonly<Props>) {
  return (
    <View
      style={{
        width: 120,
        height: 120,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={{ uri }}
        style={{ width: 120, height: 120, borderRadius: 8 }}
      >
        <TouchableOpacity
          onPress={removeImage}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            borderRadius: 15,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
        >
          <Icon source="minus" size={20} color="red" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
