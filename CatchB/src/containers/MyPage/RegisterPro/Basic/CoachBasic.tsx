import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { DocumentPickerAsset } from "expo-document-picker";

import { DisabledTextInput, MainTitle, SubTitle } from "../fragments";
import { FilePicker } from "../../../../components/Pickers";
import { Selector } from "../../../../components/Selectors";
import { RegisterProTerms } from "../../../../components/Terms";
import { RootState } from "../../../../store/store";
import { themeColors } from "../../../../variables/colors";
import { MyPageStackScreenProps } from "../../../../variables/navigation";

interface Props {
  onFinish: () => void;
}

export default function CoachStep1({ onFinish }: Readonly<Props>) {
  const [uploadedFile, setUploadedFile] = useState<DocumentPickerAsset>(null);
  const [career, setCareer] = useState<string>("프로 출신");
  const [type, setType] = useState<string>("pdf");
  const user = useSelector((state: RootState) => state.auth.user);
  const navigation =
    useNavigation<MyPageStackScreenProps<"RegisterPro">["navigation"]>();

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

  const handleRegister = () => {
    // TODO: API 연동
    console.log(uploadedFile);
    handleRegisterSuccess();
  };

  return (
    <ScrollView style={styles.container}>
      <MainTitle
        text="기본 인증"
        sub="경력 인증만으로 간편하게 캐치비 코치로 참여하세요!"
      />
      <SubTitle text="이름" />
      <DisabledTextInput text={user.full_name} />
      <SubTitle text="전화번호" />
      <DisabledTextInput text={user.phone_number} />
      <Divider bold style={styles.divider} />
      <SubTitle text="선수 경력" />
      <Selector
        multiple={false}
        options={[
          "프로 출신",
          "대학교 선수 출신",
          "고등학교 선수 출신",
          "비선수 출신",
          "기타",
        ]}
        singleSelected={career}
        setSingleSelected={setCareer}
      />
      <SubTitle text="경력 인증 서류" sub=" pdf, jpg, png만 가능합니다." />
      <View style={styles.uploadMenu}>
        <TouchableOpacity
          onPress={() => setType("pdf")}
          style={type === "pdf" ? styles.chosen : styles.notChosen}
        >
          <Text style={styles.textButton}>pdf 업로드</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType("image")}
          style={type === "image" ? styles.chosen : styles.notChosen}
        >
          <Text style={styles.textButton}>이미지 업로드</Text>
        </TouchableOpacity>
      </View>
      <FilePicker
        setUploadedFile={setUploadedFile}
      />
      <Divider bold style={styles.divider} />
      <SubTitle text="약관 동의" />
      <RegisterProTerms />
      <Divider bold style={styles.divider} />
      <Button
        mode="contained"
        onPress={handleRegister}
        style={{ marginTop: 10 }}
      >
        등록하기
      </Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingHorizontal: 20,
  },
  divider: {
    marginTop: 10,
  },
  uploadMenu: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingLeft: 5,
  },
  chosen: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 5,
    paddingRight: 10,
    backgroundColor: "rgba(192, 192, 192, 0.15)",
  },
  notChosen: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 5,
  },
});
