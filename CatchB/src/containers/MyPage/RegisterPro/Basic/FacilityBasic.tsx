import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PostCode from "@actbase/react-daum-postcode";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";

import { DisabledTextInput, MainTitle, SubTitle } from "../fragments";
import { AppDispatch, RootState } from ".store/index";
import { setMyFacilityUuid } from ".store/products/facilitySlice";
import { registerFacility } from "../../../../services/facility/facility";
import { themeColors } from ".themes/colors";
import { MyPageScreenProps } from ".constants/navigation";

interface Props {
  onFinish: () => void;
}

export default function FacilityStep1({ onFinish }: Readonly<Props>) {
  const [visible, setVisible] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<OnCompleteParams | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [address2, setAddress2] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigation =
    useNavigation<MyPageScreenProps<"RegisterPro">["navigation"]>();
  const dispatch = useDispatch<AppDispatch>();

  const handleAddressSelected = async (data: OnCompleteParams) => {
    setAddressData(data);
    setVisible(false);
  };

  const handleRegisterSuccess = () => {
    Alert.alert(
      "등록 신청 완료",
      "필수 정보 입력 완료!\n등록 승인까지 최대 3일 걸려요!\n\n계좌 정보와 시설 소개를 지금 작성하시겠습니까?",
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
      name,
      user.uuid,
      user.full_name,
      user.phone_number,
      phone,
      registrationNumber,
      addressData?.address || "",
      address2,
      addressData?.buildingName || "",
      addressData?.zonecode,
      addressData?.bcode,
      token
    );

    if (response.status === 201) {
      const facility_uuid = response.data.uuid;
      await dispatch(setMyFacilityUuid(facility_uuid));

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

  const formatPhone = (number: string) => {
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

  const handlePhoneChange = (text: string) => {
    if (
      phone.length > 1 &&
      text.length < phone.length &&
      phone[phone.length - 1] === "-"
    ) {
      // Remove the last hyphen and reformat
      const newText = text.substring(0, text.length - 1);
      const formattedNumber = formatPhone(newText);
      setPhone(formattedNumber);
    } else {
      // Normal formatting for other cases
      const formattedNumber = formatPhone(text);
      setPhone(formattedNumber);
    }
  };

  const formatRegistrationNumber = (number: string) => {
    const digits = number.replace(/\D/g, ""); // Remove non-numeric characters
    const length = digits.length;

    // Apply conditional formatting based on the length of the number
    if (length <= 5) {
      return digits.replace(/(\d{3})(\d{0,2})/, "$1-$2");
    } else {
      return digits.replace(/(\d{3})(\d{2})(\d{0,5})/, "$1-$2-$3");
    }
  };

  const handleRegistrationNumberChange = (text: string) => {
    if (
      registrationNumber.length > 1 &&
      text.length < registrationNumber.length &&
      registrationNumber[registrationNumber.length - 1] === "-"
    ) {
      // Remove the last hyphen and reformat
      const newText = text.substring(0, text.length - 1);
      const formattedNumber = formatRegistrationNumber(newText);
      setRegistrationNumber(formattedNumber);
    } else {
      // Normal formatting for other cases
      const formattedNumber = formatRegistrationNumber(text);
      setRegistrationNumber(formattedNumber);
    }
  };

  const handleError = () => {
    Alert.alert("주소 검색 오류", "주소 검색 중 오류가 발생했습니다.", [
      {
        text: "확인",
        style: "cancel",
        isPreferred: true,
      },
    ]);
  };

  return (
    <>
      <ScrollView
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        style={styles.container}
      >
        <MainTitle text="기본 정보" />
        <SubTitle text="대표자 이름" />
        <DisabledTextInput text={user.full_name} />
        <SubTitle text="대표자 연락처" />
        <DisabledTextInput text={user.phone_number} />
        <SubTitle text="아카데미 이름" />
        <TextInput
          mode="outlined"
          placeholder="시설 이름을 입력하세요"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.bold}
          textColor="black"
          placeholderTextColor="gray"
        />
        <SubTitle text="아카데미 연락처" />
        <TextInput
          mode="outlined"
          placeholder="- 없이 숫자만 입력하세요"
          value={phone}
          onChangeText={handlePhoneChange}
          style={styles.bold}
          textColor="black"
          placeholderTextColor="gray"
          keyboardType="number-pad"
        />
        <SubTitle text="사업자 등록번호" />
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
          <SubTitle text="아카데미 주소" />
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
          onPress={handleRegister}
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
