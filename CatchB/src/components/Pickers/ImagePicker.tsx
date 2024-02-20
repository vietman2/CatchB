import { Dispatch, SetStateAction } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import {
  launchImageLibraryAsync,
  ImagePickerAsset,
  MediaTypeOptions,
  ImagePickerSuccessResult,
} from "expo-image-picker";

import ImagePreview from "../Images/ImagePreview";
import ImagePlaceholder from "../Images/ImagePlaceholder";

interface Props {
  uploadedImages: ImagePickerAsset[];
  setUploadedImages: Dispatch<SetStateAction<ImagePickerAsset[]>>;
}

export default function ImagePicker({
  uploadedImages,
  setUploadedImages,
}: Readonly<Props>) {
  const uploadImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10 - uploadedImages.length,
    });

    if (result.canceled) return;

    const images = result as ImagePickerSuccessResult;
    for (let i = 0; i < images.assets.length; i++) {
      const imageAsset = images.assets[i];
      // if same image is already uploaded, skip
      if (uploadedImages.some((img) => img.fileName === imageAsset.fileName)) {
        Alert.alert("이미 업로드된 사진이 포함되어 있습니다.");
        continue;
      }
      setUploadedImages((prev) => [...prev, imageAsset]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Text variant="titleLarge" style={styles.subtitle}>
        {`아카데미 소개 사진: (${uploadedImages.length}/10)`}
      </Text>
      <ScrollView horizontal>
        {uploadedImages.map((image) => (
          <ImagePreview
            key={image.assetId}
            uri={image.uri}
            removeImage={() => removeImage(uploadedImages.indexOf(image))}
          />
        ))}
        <TouchableOpacity onPress={uploadImage} testID="imagePicker">
          <ImagePlaceholder canUpload />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
