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
import { ImagePickerAsset } from "expo-image-picker";

import { DisabledTextInput, MainTitle, SubTitle } from "../fragments";
import { LoadingComponent } from ".components/Loading";
import { FilePicker } from ".components/Pickers";
import { Selector } from ".components/Selectors";
import { RegisterProTerms } from ".components/Terms";
import { MyPageScreenProps } from ".constants/navigation";
import { registerCoach } from ".services/products";
import { RootState } from ".store/index";
import { themeColors } from ".themes/colors";

interface Props {
  onFinish: () => void;
}

export default function CoachStep1({ onFinish }: Readonly<Props>) {
  const [uploadedFile, setUploadedFile] = useState<
    DocumentPickerAsset | ImagePickerAsset
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [career, setCareer] = useState<string>("프로 선수 출신");
  const [type, setType] = useState<"pdf" | "image">("pdf");
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation =
    useNavigation<MyPageScreenProps<"RegisterPro">["navigation"]>();

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

  const handleRegister = async () => {
    setLoading(true);

    if (!uploadedFile) {
      Alert.alert("파일 업로드", "파일을 업로드해주세요.");
      setLoading(false);
      return;
    }

    const response = await registerCoach(
      user.uuid,
      user.full_name,
      user.phone_number,
      career,
      uploadedFile,
      token
    );

    if (response.status === 201) {
      handleRegisterSuccess();
    } else {
      Alert.alert("등록 실패", "다시 시도해주세요.");
    }

    setLoading(false);
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
        numItemsInRow={2}
        options={[
          "프로 선수 출신",
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
        uploadedFile={uploadedFile}
        setUploadedFile={setUploadedFile}
        type={type}
      />
      <Divider bold style={styles.divider} />
      <SubTitle text="약관 동의" />
      <RegisterProTerms />
      <Divider bold style={styles.divider} />
      {loading ? (
        <LoadingComponent style={styles.button} />
      ) : (
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          등록하기
        </Button>
      )}
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
    paddingRight: 10,
  },
  button: {
    marginTop: 20,
  },
});
