import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import MultiCheck from "../../../components/Checkboxes/MultiCheck";
import ImagePreview from "../../../components/Images/ImagePreview";
import ImagePlaceholder from "../../../components/Images/ImagePlaceholder";
import { themeColors } from "../../../variables/colors";
import WorkTimePickers from "../../../components/Pickers/WorkTimePickers";

interface Props {
  onFinish: () => void;
}

const choices = [
  "주차가능",
  "금연시설",
  "흡연실",
  "Wi-Fi",
  "에어컨",
  "난방",
  "락커",
  "탈의실",
  "샤워실",
  "사우나",
  "반려동물 출입가능",
  "어린이 놀이시설",
  "화장실",
  "남녀화장실 구분",
];

const equipment = ["나무배트", "알루미늄배트", "글러브", "포수장비"];

const others = ["개인 코치 영업 가능", "단체 수업 가능", "헬스기구"];

export default function FacilityStep2({ onFinish }: Readonly<Props>) {
  const [introduction, setIntroduction] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const uploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setUploadedImages([...uploadedImages, result.assets[0].uri]);
    }

    return result;
  };

  const handleSubmitSuccess = () => {
    onFinish();
  };
  /*
  const handleNext = () => {
    //TODO: 서버에 정보 전송
  };
*/
  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets
      keyboardDismissMode="on-drag"
    >
      <>
        <Text variant="titleLarge" style={styles.title}>
          상세 정보
        </Text>
        <Text variant="titleSmall" style={styles.description}>
          상세 정보를 다 입력하면 문의 받을 확률이 3배 높아요!
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          시설 소개
        </Text>
        <TextInput
          mode="outlined"
          placeholder="시설에 대한 소개 글을 자유롭게 작성해주세요! (최대 1000자)"
          value={introduction}
          onChangeText={(text) => setIntroduction(text)}
          textColor="black"
          placeholderTextColor="gray"
          multiline
          maxLength={1000}
          style={{ height: 150 }}
          testID="introduction"
        />
        <Text variant="titleMedium" style={styles.subtitle}>
          영업 시간
          <Text variant="titleMedium" style={{ color: "gray" }}>
            {` (나중에 변경할 수 있어요!)`}
          </Text>
        </Text>
        <WorkTimePickers />
      </>
      <Divider bold style={{ marginTop: 5 }} />
      <>
        <Text variant="titleMedium" style={styles.subtitle}>
          편의시설 및 서비스 (탭해서 선택)
        </Text>
        <MultiCheck
          options={choices}
          selected={selected}
          setSelected={setSelected}
        />
        <Text variant="titleMedium" style={styles.subtitle}>
          대여 가능 장비
        </Text>
        <MultiCheck
          options={equipment}
          selected={selected}
          setSelected={setSelected}
        />
        <TextInput
          label="추가 구비 시설 (직접 입력)"
          placeholder="예: 랩소도"
          placeholderTextColor="gray"
          style={{ height: 40 }}
        />
        <Text variant="titleMedium" style={styles.subtitle}>
          기타
        </Text>
        <MultiCheck
          options={others}
          selected={selected}
          setSelected={setSelected}
        />
      </>
      <Divider bold style={{ marginTop: 5 }} />
      <>
        <Text variant="titleMedium" style={styles.subtitle}>
          {`시설 소개 사진: (${uploadedImages.length}/10)`}
        </Text>
        <ScrollView horizontal>
          {uploadedImages.map((uri) => (
            <ImagePreview key={uri} uri={uri} />
          ))}
          <TouchableOpacity onPress={uploadImage} testID="imagePicker">
            <ImagePlaceholder canUpload />
          </TouchableOpacity>
        </ScrollView>
      </>
      <Divider bold style={{ marginTop: 5 }} />
      <Button
        mode="contained"
        style={{ marginTop: 10, marginBottom: 20 }}
        onPress={handleSubmitSuccess}
      >
        완료 (1/3)
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  description: {
    marginBottom: 5,
    color: "gray",
  },
});
