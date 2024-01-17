import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";


export default function FacilityRegister() {
  const [addressData, setAddressData] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [contact, setContact] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address2, setAddress2] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView onScroll={Keyboard.dismiss} scrollEventThrottle={16}>
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
                style={{ flex: 7 }}
              />
              <TouchableOpacity
                style={{ flex: 3, marginLeft: 10 }}
                onPress={() => {}}
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
});
