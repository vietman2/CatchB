import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "../variables/colors";
import { UserProfile } from "../variables/types";

interface ProfileBadgeProps {
  user: UserProfile | null;
}

export default function ProfileBadge(props: ProfileBadgeProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color={colors.icon} />
      <View style={styles.texts}>
        <Text style={styles.userTypeText}>
          {props.user === null
            ? "로그인 후 편하게 서비스를 이용하세요!"
            : "일반 회원"}
        </Text>
        <Text style={styles.userNameText}>
          {props.user === null
            ? "로그인"
            : props.user.full_name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  userTypeText: {
    fontSize: 16,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 5,
  },
  texts: {
    flex: 1,
    marginLeft: 10,
  }
});
