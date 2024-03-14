import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import { themeColors } from ".themes/colors";
import { UserProfileType } from ".types/users";

interface ProfileProps {
  user: UserProfileType | null;
}

export function MainProfile({ user }: Readonly<ProfileProps>) {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={80} icon="account" style={styles.icon} />
      <View style={styles.textBox}>
        <Text variant="titleMedium" style={styles.guideText}>
          {user === null
            ? "로그인 후 편하게 서비스를 이용하세요!"
            : "일반 회원"}
        </Text>
        <Text variant="headlineSmall" style={styles.profileText}>
          {user === null ? "로그인" : user.full_name}
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
  icon: {
    backgroundColor: themeColors.primary,
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
  guideText: {
    color: "gray",
  },
});
