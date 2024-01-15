import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

import { themeColors } from "../../../variables/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import SingleCheck from "../../../components/Checkboxes/SingleCheck";
import MultiCheck from "../../../components/Checkboxes/MultiCheck";

export default function CoachRegister() {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log(result);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text variant="titleLarge" style={styles.title}>
          기본 정보
        </Text>
        <Text variant="titleSmall" style={styles.subtitle}>
          이름 *
        </Text>
        <TextInput
          mode="outlined"
          value={user.full_name}
          disabled
          dense
          textColor="black"
          style={styles.filled}
        />
        <Text variant="titleSmall" style={styles.subtitle}>
          전화번호 *
        </Text>
        <TextInput
          mode="outlined"
          value={user.phone_number}
          disabled
          dense
          textColor="black"
          style={styles.filled}
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
          활동 지역 *
        </Text>
        <MultiCheck
          options={["서울", "경기", "인천"]}
          selected={selectedAreas}
          setSelected={setSelectedAreas}
        />
        <Text variant="titleSmall" style={styles.subtitle}>
          경력 *
        </Text>
        <Text variant="titleSmall" style={styles.subtitle}>
          코치 자격증 업로드 *
        </Text>
        <Button
          mode="contained-tonal"
          icon="upload"
          buttonColor={themeColors.primary}
          textColor={themeColors.onPrimary}
          onPress={handleUpload}
        >
          업로드
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  scroll: {
    marginHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 5,
  },
  filled: {
    backgroundColor: themeColors.secondaryContainer,
    fontWeight: "bold",
  },
});
