import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Divider, Text, TouchableRipple } from "react-native-paper";

import AvatarHorizontal from "../../components/Avatar/AvatarHorizontal";
import TextButton from "../../components/Buttons/TextButton";
import FABGroup from "../../components/Buttons/FAB";
import IconButton from "../../components/Buttons/IconButton";
import TabButton from "../../components/Buttons/TabButton";
import VerticalDivider from "../../components/Divider/VerticalDivider";
import { themeColors } from "../../variables/colors";
import { RootState } from "../../store/store";
import { MyPageStackScreenProps } from "../../variables/navigation";
import { sampleCoupons } from "../../variables/mvp_dummy_data/coupons";

export default function MyPage() {
  const navigation =
    useNavigation<MyPageStackScreenProps<"MyPageScreen">["navigation"]>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleBadgePress = () => {
    if (user) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Login");
    }
  };

  const handleCouponPress = () => {
    // TODO: replace this
    if (!user) {
      navigation.navigate("Login");
    }
    else {
      navigation.navigate("CouponList");
    }
  };

  const handlePointPress = () => {
    navigation.navigate("Points");
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TouchableRipple
            onPress={handleBadgePress}
            testID="avatar-horizontal"
          >
            <AvatarHorizontal user={user} />
          </TouchableRipple>
          <View style={styles.mainOptions}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 10,
              }}
            >
              <IconButton icon="bookmark" title="즐겨찾기" />
              <VerticalDivider />
              <IconButton icon="history" title="최근 본" />
              <VerticalDivider />
              <IconButton icon="star" title="평가하기" />
            </View>
            <Divider />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <TabButton
                  title="쿠폰함"
                  detail="x 장"
                  onPress={handleCouponPress}
                />
              </View>
              <VerticalDivider />
              <View style={{ flex: 1 }}>
                <TabButton title="포인트" detail="y p" onPress={handlePointPress} />
              </View>
            </View>
          </View>
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
  mainOptions: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: themeColors.secondaryContainer,
    padding: 10,
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
