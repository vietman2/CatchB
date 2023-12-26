import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Divider, Text, TouchableRipple } from "react-native-paper";

import ProfileBadge from "../../components/Profile/ProfileBadge";
import { TextButton } from "../../components/Buttons/Buttons";
import { themeColors } from "../../variables/colors";
import { RootState } from "../../store/store";
import { MyPageStackScreenProps } from "../../variables/navigation";
import { FABGroup } from "../../components/Buttons/FAB";

export default function MyPage() {
  const navigation =
    useNavigation<MyPageStackScreenProps<"MyPageScreen">["navigation"]>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleBadgePress = () => {
    if (user) {
      //navigation.navigate("Profile");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <>
    <ScrollView>
      <View style={styles.container}>
        <TouchableRipple onPress={handleBadgePress}>
          <ProfileBadge user={user} />
        </TouchableRipple>
        <View style={styles.menus}>
          <Divider style={styles.divider} />
          <Text variant="titleLarge" style={styles.subtitle}>
            이벤트
          </Text>
          <TextButton text="친구 초대하기" onPress={() => {}} />
          <TextButton text="레슨 코치 초대하기" onPress={() => {}} />
          <TextButton text="매장 정보 제보하기" onPress={() => {}} />
          <Divider style={styles.divider} />
          <Text variant="titleLarge" style={styles.subtitle}>
            결제
          </Text>
          <TextButton text="결제수단" onPress={() => {}} />
          <Divider style={styles.divider} />
          <Text variant="titleLarge" style={styles.subtitle}>
            고객센터 및 설정
          </Text>
          <TextButton text="1:1 문의" onPress={() => {}} />
          <TextButton text="공지사항" onPress={() => {}} />
          <TextButton text="자주 묻는 질문" onPress={() => {}} />
          <TextButton text="알림 맞춤 설정" onPress={() => {}} />
          <Divider style={styles.divider} />
        </View>
      </View>
    </ScrollView>
    <FABGroup />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primaryContainer,
    paddingVertical: 10,
  },
  menus: {
    padding: 10,
  },
  divider: {
    marginVertical: 10,
  },
  subtitle: {
    fontWeight: "bold",
    padding: 5,
    marginBottom: 10,
  },
});
