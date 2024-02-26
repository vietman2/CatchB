import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";

interface Props {
  setUploadedFile: Dispatch<SetStateAction<DocumentPickerAsset>>;
}

export function FilePicker({
  setUploadedFile,
}: Readonly<Props>) {
  const handleUpload = async () => {
    const result = await getDocumentAsync({
      type: ["application/pdf"],
    });

    if (!result.canceled) {
      setUploadedFile(result.assets[0]);
    }
  };

  return (
    <TouchableOpacity style={styles.upload} onPress={handleUpload}>
      <Icon source="plus-circle" size={24} color="green" />
      <Text variant="titleMedium" style={{ marginLeft: 10, color: "gray" }}>
        파일 업로드
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  upload: {
    flexDirection: "row",
    backgroundColor: "rgba(192, 192, 192, 0.15)",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    paddingVertical: 5,
    paddingLeft: 10,
    alignItems: "center",
  },
});
