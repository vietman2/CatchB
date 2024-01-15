import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function FacilityRegister() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        기본 정보
      </Text>
      <Text variant="titleSmall" style={styles.subtitle}>
        시설 이름 *
      </Text>
      <TextInput mode="outlined" value={""} dense textColor="black" />
      <Text variant="titleSmall" style={styles.subtitle}>
        시설 연락처 *
      </Text>
      <TextInput mode="outlined" value={""} dense textColor="black" />
      <Text variant="titleSmall" style={styles.subtitle}>
        사업자 등록번호 (-없이 작성해주세요) *
      </Text>
      <TextInput mode="outlined" value={""} dense textColor="black" />
      <Text variant="titleSmall" style={styles.subtitle}>
        시설 주소 *
      </Text>
      <TextInput mode="outlined" value={""} dense textColor="black" />
      <TextInput mode="outlined" value={""} dense textColor="black" />
      <Text variant="titleSmall" style={styles.subtitle}>
        대표자 이름 *
      </Text>
      <TextInput mode="outlined" value={""} dense textColor="black" />
      <Text variant="titleSmall" style={styles.subtitle}>
        대표자 연락처 *
      </Text>
      <TextInput mode="outlined" value={""} dense textColor="black" />
    </View>
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
});
