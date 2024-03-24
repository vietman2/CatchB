import { Dispatch, SetStateAction } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import {
  launchImageLibraryAsync,
  ImagePickerAsset,
  MediaTypeOptions,
  ImagePickerSuccessResult,
} from "expo-image-picker";

import { ImagePreview, ImagePlaceholder } from ".components/Images";

interface Props {
  uploadedImages: ImagePickerAsset[];
  setUploadedImages: Dispatch<SetStateAction<ImagePickerAsset[]>>;
}

export function ImagePicker({
  uploadedImages,
  setUploadedImages,
}: Readonly<Props>) {
  const uploadImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 10 - uploadedImages.length,
    });

    if (result.canceled) return;

    const images = result as ImagePickerSuccessResult;
    for (let imageAsset of images.assets) {
      if (uploadedImages.some((img) => img.fileName === imageAsset.fileName)) {
        // if same image is already uploaded, skip
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
    <ScrollView horizontal>
      {uploadedImages.map((image) => (
        <ImagePreview
          key={image.assetId}
          uri={image.uri}
          removeImage={() => removeImage(uploadedImages.indexOf(image))}
        />
      ))}
      <TouchableOpacity onPress={uploadImage} testID="imagePicker">
        <ImagePlaceholder />
      </TouchableOpacity>
    </ScrollView>
  );
}
