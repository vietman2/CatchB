import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import AvatarImage from "../../components/Avatar/AvatarImage";
import Tab from "../../components/Buttons/TabButton";
import VerticalDivider from "../../components/Divider/VerticalDivider";
import { RootState } from "../../store/store";
import { themeColors } from "../../variables/colors";
import { MyPageStackParamList } from "../../variables/navigation";

type NavigationProp = StackNavigationProp<MyPageStackParamList, "Profile">;
interface Props {
  navigation: NavigationProp;
}

export default function UserProfile({ navigation }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <View style={styles.container}>
        <AvatarImage profileImage={user?.profile_image} />
        <Text variant="titleLarge">{user?.username}</Text>
        <View style={styles.tabs}>
          <Tab
            title="닉네임"
            detail={user?.full_name || ""}
            onPress={() =>
              navigation.navigate("EditProfile", {
                title: "닉네임",
                detail: user?.full_name || "",
              })
            }
            paddingVertical={15}
          />
          <Tab
            title="이메일"
            detail={user?.email || ""}
            onPress={() =>
              navigation.navigate("EditProfile", {
                title: "이메일",
                detail: user?.email || "",
              })
            }
            paddingVertical={15}
          />
          <Tab title="비밀번호" detail="" paddingVertical={15} />
          <Tab
            title="휴대폰 번호"
            detail={user?.phone_number || ""}
            onPress={() =>
              navigation.navigate("EditProfile", {
                title: "휴대폰 번호",
                detail: user?.phone_number || "",
              })
            }
            paddingVertical={15}
          />
        </View>
        <View style={styles.tabs}>
          <Tab title="연동된 소셜 계정" detail="없음" paddingVertical={15} />
        </View>
      </View>
      <View style={styles.others}>
        <Text style={{ marginRight: 10 }}>로그아웃</Text>
        <VerticalDivider />
        <Text style={{ marginLeft: 10 }}>회원탈퇴</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    alignItems: "center",
  },
  tabs: {
    marginTop: 20,
    borderColor: themeColors.secondaryContainer,
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
  },
  others: {
    flexDirection: "row",
    backgroundColor: themeColors.primaryContainer,
    justifyContent: "center",
    paddingBottom: 20,
  },
});
