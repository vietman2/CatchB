import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, Snackbar } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import AvatarImage from "../../components/Avatar/AvatarImage";
import Tab from "../../components/Buttons/TabButton";
import VerticalDivider from "../../components/Divider/VerticalDivider";
import { logout } from "../../services/account";
import { logout as resetUserState } from "../../store/slices/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import { get } from "../../store/secure";
import { themeColors } from "../../variables/colors";
import { MyPageStackParamList } from "../../variables/navigation";

type NavigationProp = StackNavigationProp<MyPageStackParamList, "Profile">;
interface Props {
  navigation: NavigationProp;
}

export default function UserProfile({ navigation }: Props) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    get("refresh_token").then(async (token) => {
      if (token) {
        const response = await logout(token);
        if (response.status === 200) {
          dispatch(resetUserState());
          //TODO: 로그아웃 시 유저에게 알리고 피드백 받기
          navigation.navigate("MyPageScreen");
        } else {
          setMessage("로그아웃에 실패했습니다.");
          setVisible(true);
        }
      } else {
        setMessage("로그아웃에 실패했습니다2.");
        setVisible(true);
      }
    });
  };

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
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {}}>
          <Text>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={2000}>
        {message}
      </Snackbar>
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
