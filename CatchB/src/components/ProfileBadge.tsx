import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { themeColors } from "../variables/colors";
import { UserProfile } from "../variables/types";

interface ProfileBadgeProps {
  user: UserProfile | null;
}

export default function ProfileBadge(props: ProfileBadgeProps) {
  return (
    <View style={styles.container}>
      <Avatar.Icon
        size={80}
        icon="account"
        style={{ backgroundColor: themeColors.primary }}
      />
      <View style={styles.textBox}>
        <Text
          variant="titleMedium"
          style={{ color: themeColors.tertiary }}
        >
          {props.user === null
            ? "로그인 후 편하게 서비스를 이용하세요!"
            : "일반 회원"}
        </Text>
        <Text variant="headlineSmall" style={styles.profileText}>
          {props.user === null ? "로그인" : props.user.full_name}
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
  textBox: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-evenly",
  },
  profileText: {
    fontFamily: "Catch B ExtraBold",
    color: themeColors.primary,
  },
});
