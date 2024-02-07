import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Text, TextInput } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

import AreaPicker from "../../../components/Dialogs/AreaPicker";
import SingleCheck from "../../../components/Checkboxes/SingleCheck";
import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";
import { useNavigation } from "@react-navigation/native";
import { MyPageStackScreenProps } from "../../../variables/navigation";

interface Props {
  onFinish: () => void;
}

export default function CoachStep1({ onFinish }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<MyPageStackScreenProps<"CoachRegister">["navigation"]>();

  const handleUpload = async () => {
    await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    // Todo: API 연동

  };

  const handleRegisterSuccess = () => {
    Alert.alert(
      "등록 신청 완료",
      "필수 정보 입력 완료!\n등록까지 최대 3일 걸려요!\n\n계좌 정보와 시설 소개를 지금 작성하시겠습니까?",
      [
        {
          text: "나중에 하기",
          onPress: () => navigation.navigate("MyPageScreen"),
          isPreferred: true,
        },
        {
          text: "확인",
          onPress: () => onFinish(),
          isPreferred: true,
        },
      ]
    );
  };
/*
  const handleRegister = () => {
    // TODO: API 연동
  }; */

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
          mode="text"
          icon="playlist-check"
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
        <Button mode="text" icon="upload" onPress={handleUpload}>
          업로드
        </Button>
        <Button mode="contained" onPress={handleRegisterSuccess}>
          등록하기
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
