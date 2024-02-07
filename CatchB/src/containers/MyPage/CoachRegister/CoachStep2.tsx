import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

import MultiCheck from "../../../components/Checkboxes/MultiCheck";
import WorkTimePickers from "../../../components/Pickers/WorkTimePickers";
import { themeColors } from "../../../variables/colors";

interface Props {
  onFinish: () => void;
}

export default function CoachStep2({ onFinish }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState<string>("");
  const [career, setCareer] = useState<string>("");

  const choices = [
    "왕초보/기초",
    "주니어/아동",
    "중고등 선수",
    "사회인 야구",
    "스윙 교정",
    "투구 교정",
    "그룹 레슨",
    "기타",
  ];

  const handleSubmitSuccess = () => {
    onFinish();
  };
  /*
  const handleSubmit = () => {
    // TODO: API 연동
  };*/

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets
      keyboardDismissMode="on-drag"
    >
      <Text variant="titleLarge" style={styles.title}>
        상세 정보
      </Text>
      <Text variant="titleSmall" style={styles.description}>
        상세 정보를 다 입력하면 문의 받을 확률이 3배 높아요!
      </Text>
      <Text variant="titleMedium" style={styles.subtitle}>
        전문 분야 (복수 선택 가능)
      </Text>
      <MultiCheck
        options={choices}
        selected={selected}
        setSelected={setSelected}
      />
      <Text variant="titleMedium" style={styles.subtitle}>
        커리큘럼
      </Text>
      <TextInput
        mode="outlined"
        placeholder="코치님만의 수업 방식을 자유롭게 작성해주세요! (최대 1000자)"
        value={curriculum}
        onChangeText={(text) => setCurriculum(text)}
        textColor="black"
        placeholderTextColor="gray"
        multiline
        maxLength={1000}
        style={{ height: 150 }}
        testID="curriculum"
      />
      <Text variant="titleMedium" style={styles.subtitle}>
        경력/자격
      </Text>
      <TextInput
        mode="outlined"
        placeholder={"예)\n- 커리어1\n- 커리어2\n- 커리어3\n- ..."}
        value={career}
        onChangeText={(text) => setCareer(text)}
        textColor="black"
        placeholderTextColor="gray"
        multiline
        maxLength={1000}
        style={{ height: 150 }}
        testID="career"
      />
      <Text variant="titleMedium" style={styles.subtitle}>
        스케줄
      </Text>
      <WorkTimePickers />
      <Divider />
      <Text variant="titleLarge" style={styles.title}>
        소개/레슨 영상
      </Text>
      <Text variant="titleMedium" style={styles.subtitle}>
        소개 영상
      </Text>
      <Button
        mode="contained"
        onPress={handleSubmitSuccess}
        style={styles.button}
      >
        다음 (1/3)
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
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
});
