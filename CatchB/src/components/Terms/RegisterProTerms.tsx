import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

export function RegisterProTerms() {
  return (
    <View style={styles.termsBox}>
      <Text>Catch B 아카데미 회원약관</Text>
      <View style={styles.terms}>
        <View style={styles.horizontal}>
          <Icon source="checkbox-blank-outline" size={16} />
          <Text> Catch B 안심 아카데미 정책 동의</Text>
          <Text style={styles.required}> (필수)</Text>
        </View>
        <Text>보기</Text>
      </View>
      <View style={styles.terms}>
        <View style={styles.horizontal}>
          <Icon source="checkbox-outline" size={16} />
          <Text> Catch B 개인정보 처리 방침</Text>
          <Text style={styles.required}> (필수)</Text>
        </View>
        <Text>보기</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  termsBox: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
  },
  terms: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  required: {
    color: "red",
  },
});
