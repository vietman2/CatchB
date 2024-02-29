import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "react-native-paper";
import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";
import {
  launchImageLibraryAsync,
  ImagePickerAsset,
  MediaTypeOptions,
  ImagePickerSuccessResult,
} from "expo-image-picker";

interface Props {
  uploadedFile: DocumentPickerAsset | ImagePickerAsset;
  setUploadedFile: Dispatch<
    SetStateAction<DocumentPickerAsset | ImagePickerAsset>
  >;
  type: "pdf" | "image";
}

export function FilePicker({
  uploadedFile,
  setUploadedFile,
  type,
}: Readonly<Props>) {
  const handleUpload = async () => {
    if (type === "image") {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
      });

      if (result.canceled) return;

      const image = result as ImagePickerSuccessResult;

      setUploadedFile(image.assets[0]);
    } else {
      const result = await getDocumentAsync({
        type: ["application/pdf"],
      });

      if (!result.canceled) {
        setUploadedFile(result.assets[0]);
      }
    }
  };

  const renderText = () => {
    if (uploadedFile) {
      if (type === "image") {
        const file = uploadedFile as ImagePickerAsset;
        return file.fileName;
      } else {
        const file = uploadedFile as DocumentPickerAsset;
        return file.name;
      }
    }
    return type === "image" ? "이미지 업로드" : "파일 업로드";
  };

  return (
    <TouchableOpacity style={styles.upload} onPress={handleUpload}>
      <Icon source="plus-circle" size={24} color="green" />
      <Text variant="titleMedium" style={{ marginLeft: 10, color: "gray" }}>
        {renderText()}
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
    paddingVertical: 10,
    paddingLeft: 10,
    alignItems: "center",
    overflow: "hidden",
  },
});
