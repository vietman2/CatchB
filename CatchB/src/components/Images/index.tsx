import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";

interface PreviewProps {
  uri: string;
  removeImage: () => void;
}

export function ImagePreview({ uri, removeImage }: Readonly<PreviewProps>) {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri }} style={styles.image}>
        <TouchableOpacity
          onPress={removeImage}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            borderRadius: 15,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          }}
          testID="removeImage"
        >
          <Icon source="minus" size={20} color="red" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export function ImagePlaceholder() {
  return (
    <View style={{ ...styles.container, backgroundColor: "gray" }}>
      <Icon source="plus" size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
});
