import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  handleTemporarySave: () => void;
  handleCreatePost: () => void;
}

export default function Buttons({ handleTemporarySave, handleCreatePost }: Props) {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={[styles.button, styles.tempButton]}
        onPress={handleTemporarySave}
      >
        <Text style={styles.buttonText}>임시 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.uploadButton]}
        onPress={handleCreatePost}
      >
        <Text style={styles.buttonText}>등록</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tempButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "gray",
  },
  uploadButton: {
    flex: 3,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
