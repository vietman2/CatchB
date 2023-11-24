import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import TopBar from "../components/TopBar";
import ProfileBadge from "../components/ProfileBadge";
import { TextButton } from "../components/Buttons";
import { colors } from "../variables/colors";
import { RootState } from "../store/store";
import { MyPageStackScreenProps } from "../variables/navigation";

export default function MyPage() {
  const navigation =
    useNavigation<MyPageStackScreenProps<"MyPageScreen">["navigation"]>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleBadgePress = () => {
    if (user) {
      //navigation.navigate("Profile");
    }
    else {
      navigation.navigate("Login");
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TopBar />
        <TouchableOpacity onPress={handleBadgePress}>
          <ProfileBadge user={user} />
        </TouchableOpacity>
        <View>
          <Text>이벤트</Text>
          <TextButton text="친구 초대하기" onPress={() => {}} />
          <TextButton text="레슨 코치 초대하기" onPress={() => {}} />
          <TextButton text="매장 정보 제보하기" onPress={() => {}} />
          <Text>결제</Text>
          <TextButton text="결제수단" onPress={() => {}} />
          <Text>고객센터 및 설정</Text>
          <TextButton text="1:1 문의" onPress={() => {}} />
          <TextButton text="공지사항" onPress={() => {}} />
          <TextButton text="자주 묻는 질문" onPress={() => {}} />
          <TextButton text="알림 맞춤 설정" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.docs}>
        <TextButton text="개인정보 처리방침" onPress={() => {}} />
        <TextButton text="이용약관" onPress={() => {}} />
        <TextButton text="현재 버전 0.1.0" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whitebackground,
  },
  docs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});
