import { useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, Chip } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

import SingleCheck from "../../../components/Checkboxes/SingleCheck";
import AreaPicker from "../../../components/Dialogs/AreaPicker";
import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";

export default function CoachRegister() {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(result);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          기본 정보
        </Text>
        <Text variant="titleSmall" style={styles.subtitle}>
          이름 *
        </Text>
        <TextInput
          style={styles.uneditable}
          mode="outlined"
          value={user.full_name}
          editable={false}
          textColor="black"
        />
        <Text variant="titleSmall" style={styles.subtitle}>
          전화번호 *
        </Text>
        <TextInput
          style={styles.uneditable}
          mode="outlined"
          value={user.phone_number}
          editable={false}
          textColor="black"
        />
        <Text variant="titleSmall" style={styles.subtitle}>
          생년월일 *
        </Text>
        <TextInput
          style={styles.uneditable}
          mode="outlined"
          value={user?.birth_date}
          editable={false}
          textColor="black"
        />
        <Text variant="titleSmall" style={styles.subtitle}>
          성별 *
        </Text>
        <SingleCheck
          options={["남자", "여자"]}
          selected={selectedGender}
          setSelected={setSelectedGender}
        />
        <Text variant="titleSmall" style={styles.subtitle}>
          활동 지역 (최대 5개 지역까지 선택 가능) *
        </Text>
        <View style={styles.chips}>
          {selectedAreas.map((area) => (
            <Chip
              key={area}
              style={{
                backgroundColor: "green",
                marginRight: 10,
                marginBottom: 5,
              }}
            >
              {area}
            </Chip>
          ))}
        </View>
        <Button
          mode="contained-tonal"
          icon="playlist-check"
          buttonColor={themeColors.primary}
          onPress={() => setVisible(true)}
        >
          {selectedAreas.length === 0 ? "선택하기" : "다시 선택하기"}
        </Button>
        <Text variant="titleSmall" style={styles.subtitle}>
          경력 *
        </Text>
        <SingleCheck
          options={["프로 선출", "대학 선출", "고등 선출", "중등 선출", "기타"]}
          selected={selectedGender}
          setSelected={setSelectedGender}
        />
        <Text variant="titleSmall" style={styles.subtitle}>
          코치 자격증 업로드 *
        </Text>
        <Button
          mode="contained-tonal"
          icon="upload"
          buttonColor={themeColors.primary}
          onPress={handleUpload}
        >
          업로드
        </Button>
      </ScrollView>
      <AreaPicker
        visible={visible}
        onDismiss={() => setVisible(false)}
        setSelectedAreas={(areas) => setSelectedAreas(areas)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
  },
  uneditable: {
    backgroundColor: themeColors.secondaryContainer,
    fontWeight: "bold",
    height: 40,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
