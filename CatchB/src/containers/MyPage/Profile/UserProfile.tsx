import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, Portal, Dialog, Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import { AvatarImage } from "../../../components/Profile";
import { TabButton } from "../../../components/Buttons";
import { VerticalDivider } from "../../../components/Dividers";
import { deleteAccount, logout } from "../../../services/user_management/account";
import { RootState, AppDispatch } from "../../../store/store";
import { get } from "../../../store/secure";
import { logout as resetUserState } from "../../../store/slices/user_management/authSlice";
import { themeColors } from "../../../variables/colors";
import { MyPageStackParamList } from "../../../variables/navigation";

type NavigationProp = StackNavigationProp<MyPageStackParamList, "Profile">;
interface Props {
  navigation: NavigationProp;
}

export default function UserProfile({ navigation }: Readonly<Props>) {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    get("refresh_token").then(async (token) => {
      if (token) {
        const response = await logout(token);
        if (response.status === 200) {
          Alert.alert("로그아웃 되었습니다.");
          await dispatch(resetUserState());
          navigation.navigate("MyPageScreen");
        } else {
          Alert.alert("로그아웃에 실패했습니다.");
        }
      } else {
        Alert.alert("로그아웃에 실패했습니다2.");
      }
    });
  };

  const onDeleteAccountPress = () => {
    setVisible(true);
  };

  const handleDeleteAccount = async () => {
    // TODO: 맞다고 하면 비밀번호 입력받고
    // TODO: 비밀번호가 맞으면 회원탈퇴
    const response = await deleteAccount(user.uuid, token);
    if (response.status === 200) {
      Alert.alert("회원탈퇴 되었습니다.");
      await dispatch(resetUserState());
      navigation.navigate("MyPageScreen");
    } else {
      Alert.alert("회원탈퇴에 실패했습니다.");
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <AvatarImage profileImage={user?.profile_image} />
          <Text variant="titleLarge">{`${user?.full_name} (${user?.gender})`}</Text>
          <View style={styles.tabs}>
            <TabButton
              title="아이디"
              detail={user?.username || ""}
              showArrow={false}
              paddingVertical={15}
            />
            <TabButton
              title="이메일"
              detail={user?.email || ""}
              showArrow
              onPress={() =>
                navigation.navigate("EditProfile", {
                  title: "이메일",
                  detail: user?.email || "",
                })
              }
              paddingVertical={15}
            />
            <TabButton
              title="휴대폰 번호"
              detail={user?.phone_number || ""}
              showArrow
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
            <TabButton
              title="닉네임"
              detail={user?.nickname || ""}
              showArrow
              onPress={() =>
                navigation.navigate("EditProfile", {
                  title: "닉네임",
                  detail: user?.nickname || "",
                })
              }
              paddingVertical={15}
            />
            <TabButton
              title="야구 경력"
              detail={user?.experience_tier || ""}
              showArrow
              onPress={() =>
                navigation.navigate("EditProfile", {
                  title: "야구 경력",
                  detail: user?.experience_tier || "",
                })
              }
              paddingVertical={15}
            />
            <TabButton
              title="생년월일"
              detail={user?.birth_date || ""}
              showArrow
              onPress={() =>
                navigation.navigate("EditProfile", {
                  title: "생년월일",
                  detail: user?.birth_date || "",
                })
              }
              paddingVertical={15}
            />
          </View>
          <View style={styles.tabs}>
            <TabButton
              title="비밀번호 변경하기"
              detail=""
              paddingVertical={15}
              showArrow
              onPress={() => navigation.navigate("PasswordChange")}
            />
          </View>
          <View style={styles.tabs}>
            <TabButton
              title="연동된 소셜 계정"
              detail="없음"
              paddingVertical={15}
              showArrow
            />
            <TabButton
              title="가입 날짜"
              detail={user?.date_joined || ""}
              showArrow={false}
              paddingVertical={15}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.others}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleLogout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
        <VerticalDivider />
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={onDeleteAccountPress}
        >
          <Text>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>회원 탈퇴</Dialog.Title>
          <Dialog.Content>
            <Text>정말로 회원 탈퇴 하시겠습니까?</Text>
            <Text>{"\n(30일안에 다시 돌아오면 계정 복구 가능?)"}</Text>
            <Text>(아니면 되돌릴 수 없음?)</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>취소</Button>
            <Button onPress={handleDeleteAccount}>확인</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
  },
  body: {
    alignItems: "center",
    paddingBottom: 20,
  },
  tabs: {
    marginTop: 20,
    borderColor: "silver",
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
