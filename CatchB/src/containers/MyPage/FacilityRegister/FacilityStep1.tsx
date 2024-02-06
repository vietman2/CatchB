import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PostCode from "@actbase/react-daum-postcode";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";

import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";
import { MyPageStackScreenProps } from "../../../variables/navigation";
import { registerFacility } from "../../../services/facility/facility";

interface Props {
  onFinish: () => void;
}

export default function FacilityStep1({ onFinish }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<OnCompleteParams | null>(null);
  const [facilityName, setFacilityName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [address2, setAddress2] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);
  const navigation =
    useNavigation<MyPageStackScreenProps<"FacilityRegister">["navigation"]>();

  const handleAddressSelected = async (data: OnCompleteParams) => {
    setAddressData(data);
    setVisible(false);
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

  const handleRegister = async () => {
    const response = await registerFacility(
      facilityName,
      user.uuid,
      user.full_name,
      user.phone_number,
      contact,
      registrationNumber,
      `${addressData?.roadAddress} ${address2}`,
      addressData?.address || "",
      address2,
      addressData?.addressEnglish,
      addressData?.jibunAddress,
      addressData?.zonecode,
      addressData?.sido,
      addressData?.sigungu
    );

    if (response.status === 201) {
      handleRegisterSuccess();
    } else if (response.status === 400) {
      Alert.alert("등록 실패", response.data.message, [
        {
          text: "확인",
          style: "cancel",
          isPreferred: true,
        },
      ]);
    } else {
      Alert.alert("등록 실패", "오류가 발생했습니다. 다시 시도해주세요.", [
        {
          text: "확인",
          style: "cancel",
          isPreferred: true,
        },
      ]);
    }
  };

  const formatContact = (number: string) => {
    const digits = number.replace(/\D/g, "");

    // Formatting for mobile numbers (starts with 010)
    if (digits.startsWith("010")) {
      if (digits.length <= 7) {
        return digits.replace(/(\d{3})(\d{0,4})/, "$1-$2").trim();
      }
      return digits.replace(/(\d{3})(\d{0,4})(\d{0,4})/, "$1-$2-$3").trim();
    }

    // Formatting for Seoul landline numbers (starts with 02)
    if (digits.startsWith("02")) {
      if (digits.length <= 6) {
        return digits.replace(/(\d{2})(\d{0,3})/, "$1-$2").trim();
      }
      if (digits.length <= 9) {
        return digits.replace(/(\d{2})(\d{0,3})(\d{0,4})/, "$1-$2-$3").trim();
      }
      return digits.replace(/(\d{2})(\d{0,4})(\d{0,4})/, "$1-$2-$3").trim();
    }

    // Formatting for other landline numbers (starts with 03x, 04x, 05x, 06x)
    if (/^0[3-6]\d/.test(digits)) {
      if (digits.length <= 7) {
        return digits.replace(/(\d{3})(\d{0,4})/, "$1-$2").trim();
      }
      return digits.replace(/(\d{3})(\d{0,4})(\d{0,4})/, "$1-$2-$3").trim();
    }

    return number;
  };

  const handleContactChange = (text: string) => {
    if (
      contact.length > 1 &&
      text.length < contact.length &&
      contact[contact.length - 1] === "-"
    ) {
      // Remove the last hyphen and reformat
      const newText = text.substring(0, text.length - 1);
      const formattedNumber = formatContact(newText);
      setContact(formattedNumber);
    } else {
      // Normal formatting for other cases
      const formattedNumber = formatContact(text);
      setContact(formattedNumber);
    }
  };

  const formatRegistrationNumber = (number: string) => {
    const digits = number.replace(/\D/g, ""); // Remove non-numeric characters
    const length = digits.length;

    // Apply conditional formatting based on the length of the number
    if (length <= 3) {
      return digits;
    } else if (length <= 5) {
      return digits.replace(/(\d{3})(\d{0,2})/, "$1-$2");
    } else {
      return digits.replace(/(\d{3})(\d{2})(\d{0,5})/, "$1-$2-$3");
    }
  };

  const handleRegistrationNumberChange = (text: string) => {
    const lastCharDeleted =
      registrationNumber.length > 1 &&
      text.length < registrationNumber.length &&
      registrationNumber[registrationNumber.length - 1] === "-";

    let newText = text;
    // If the last character deleted is a hyphen, remove it before formatting
    if (lastCharDeleted) {
      newText = text.substring(0, text.length - 1);
    }

    const formattedNumber = formatRegistrationNumber(newText);
    setRegistrationNumber(formattedNumber);
  };

  const handleError = () => {
    Alert.alert("주소 검색 오류", "주소 검색 중 오류가 발생했습니다.", [
      {
        text: "확인",
        style: "cancel",
        isPreferred: true,
      },
    ]);
  }

  return (
    <>
        <ScrollView
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="on-drag"
          style={styles.container}
        >
          <Text variant="titleLarge" style={styles.title}>
            기본 정보
          </Text>
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              대표자 이름 *
            </Text>
            <TextInput
              style={styles.uneditable}
              mode="outlined"
              value={user.full_name}
              editable={false}
              textColor="black"
            />
          </>
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              대표자 연락처 *
            </Text>
            <TextInput
              style={styles.uneditable}
              mode="outlined"
              value={user.phone_number}
              editable={false}
              textColor="black"
            />
          </>
          <Text variant="titleSmall" style={styles.subtitle}>
            시설 이름 *
          </Text>
          <TextInput
            mode="outlined"
            placeholder="시설 이름을 입력하세요"
            value={facilityName}
            onChangeText={(text) => setFacilityName(text)}
            style={styles.bold}
            textColor="black"
            placeholderTextColor="gray"
          />
          <Text variant="titleSmall" style={styles.subtitle}>
            시설 연락처 *
          </Text>
          <TextInput
            mode="outlined"
            placeholder="- 없이 숫자만 입력하세요"
            value={contact}
            onChangeText={handleContactChange}
            style={styles.bold}
            textColor="black"
            placeholderTextColor="gray"
            keyboardType="number-pad"
          />
          <Text variant="titleSmall" style={styles.subtitle}>
            사업자 등록번호 *
          </Text>
          <TextInput
            mode="outlined"
            placeholder="사업자 등록번호를 입력하세요 (- 제외)"
            value={registrationNumber}
            onChangeText={handleRegistrationNumberChange}
            style={styles.bold}
            textColor="black"
            placeholderTextColor="gray"
            keyboardType="number-pad"
          />
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              시설 주소 *
            </Text>
            <View style={styles.addressLine}>
              <TextInput
                mode="outlined"
                value={addressData?.address || ""}
                placeholder="도로명 주소"
                textColor="black"
                placeholderTextColor={"gray"}
                editable={false}
                style={{ flex: 7, ...styles.bold }}
              />
              <TouchableOpacity
                style={{ flex: 3, marginLeft: 10 }}
                onPress={() => setVisible(true)}
              >
                <Button
                  mode="contained-tonal"
                  textColor="black"
                  buttonColor="silver"
                >
                  검색
                </Button>
              </TouchableOpacity>
            </View>
            <TextInput
              mode="outlined"
              value={address2}
              placeholder="상세주소를 입력하세요"
              onChangeText={(text) => setAddress2(text)}
              style={styles.bold}
              textColor="black"
              placeholderTextColor="gray"
            />
          </>
          <Button
            mode="contained-tonal"
            buttonColor={themeColors.primary}
            onPress={handleRegisterSuccess}
            style={{ marginTop: 20 }}
          >
            등록하기
          </Button>
        </ScrollView>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>주소 검색</Dialog.Title>
          <Dialog.Content>
            <PostCode
              style={styles.postcodeSearch}
              jsOptions={{
                animation: false,
                hideEngBtn: true,
                hideMapBtn: true,
              }}
              onSelected={(data) => handleAddressSelected(data)}
              onError={handleError}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>취소</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  uneditable: {
    backgroundColor: themeColors.secondaryContainer,
    fontWeight: "bold",
    height: 40,
  },
  bold: {
    fontWeight: "bold",
    height: 40,
  },
  addressLine: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  postcodeSearch: {
    width: "100%",
    height: 500,
  },
});
