import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";

import { MyImageAsset } from "../variables";

interface Props {
  uploadedImages: MyImageAsset[];
}

export default function ImageList({ uploadedImages }: Props) {
  return (
    <>
      {uploadedImages.map((image) => (
        <View style={styles.box} key={image.url}>
          <Icon source="image" size={24} color="green" />
          <Text variant="titleMedium" style={styles.text}>
            {image.fileName}
          </Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    backgroundColor: "rgba(192, 192, 192, 0.15)",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  text: {
    marginLeft: 10,
  },
});
