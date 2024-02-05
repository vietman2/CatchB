import { View, Image } from "react-native";

interface Props {
  uri: string;
}

export default function ImagePreview({ uri }: Props) {
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
      <Image
        source={{ uri }}
        style={{ width: 120, height: 120, borderRadius: 8 }}
      />
    </View>
  );
}
