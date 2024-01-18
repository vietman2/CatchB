import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import PostCode from "@actbase/react-daum-postcode";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";

import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";

export default function FacilityRegister() {
  const [visible, setVisible] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [contact, setContact] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address2, setAddress2] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);

  const handleAddressSelected = (data: OnCompleteParams) => {
    setAddressData(data);
    setVisible(false);
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView onTouchStart={Keyboard.dismiss}>
          <Text variant="titleLarge" style={styles.title}>
            기본 정보
          </Text>
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              시설 이름 *
            </Text>
            <TextInput
              mode="outlined"
              placeholder="시설 이름을 입력하세요"
              value={facilityName}
              onChangeText={(text) => setFacilityName(text)}
              dense
              textColor="black"
              style={facilityName === "" ? {} : styles.bold}
            />
          </>
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              시설 연락처 *
            </Text>
            <TextInput
              mode="outlined"
              placeholder="- 없이 숫자만 입력하세요"
              value={contact}
              dense
              textColor="black"
              onChangeText={(text) => setContact(text)}
              style={contact === "" ? {} : styles.bold}
            />
          </>
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              사업자 등록번호 *
            </Text>
            <TextInput
              mode="outlined"
              value={registrationNumber}
              placeholder="사업자 등록번호를 입력하세요 (- 제외)"
              onChangeText={(text) => setRegistrationNumber(text)}
              dense
              textColor="black"
              style={registrationNumber === "" ? {} : styles.bold}
            />
          </>
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              시설 주소 *
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 5,
                alignItems: "center",
              }}
            >
              <TextInput
                mode="outlined"
                value={addressData?.address || ""}
                placeholder="도로명 주소"
                dense
                textColor="black"
                editable={false}
                style={{ flex: 7, fontWeight: "bold" }}
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
              placeholder="상세주소를 입력하세요"
              value={address2}
              onChangeText={(text) => setAddress2(text)}
              dense
              textColor="black"
              style={address2 === "" ? {} : styles.bold}
            />
          </>
          <>
            <Text variant="titleSmall" style={styles.subtitle}>
              대표자 이름 *
            </Text>
            <TextInput
              style={styles.uneditable}
              mode="outlined"
              value={user.full_name}
              editable={false}
              dense
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
              dense
              textColor="black"
            />
          </>
        </ScrollView>
      </KeyboardAvoidingView>
      <Portal>
        <Dialog visible={visible} style={{ backgroundColor: "white" }}>
          <Dialog.Title>주소 검색</Dialog.Title>
          <Dialog.Content>
            <PostCode
              style={{ width: "100%", height: 500 }}
              jsOptions={{ animation: true }}
              onSelected={(data) => handleAddressSelected(data)}
              onError={(error) => console.log(error)}
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
  },
  uneditable: {
    backgroundColor: themeColors.secondaryContainer,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
});
