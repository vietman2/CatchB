import { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Button, Divider, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import AvatarHorizontal from "../../components/Avatar/AvatarHorizontal";
import IconButton from "../../components/Buttons/IconButton";
import TabButton from "../../components/Buttons/TabButton";
import VerticalDivider from "../../components/Divider/VerticalDivider";
import LoginDialog from "../../components/Dialogs/LoginDialog";
import { RootState } from "../../store/store";
import { themeColors } from "../../variables/colors";
import { MyPageStackScreenProps } from "../../variables/navigation";

export default function MyPage() {
  const [dialogVisible, setDialogVisible] = useState(false);
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
    if (!user) {
      setDialogVisible(true);
    } else {
      navigation.navigate("CouponList");
    }
  };

  const handlePointPress = () => {
    if (!user) {
      setDialogVisible(true);
    } else {
      navigation.navigate("Points");
    }
  };

  const handlePaymentsPress = () => {
    if (!user) {
      setDialogVisible(true);
    } else {
      navigation.navigate("Payments");
    }
  };

  const handleReviewPress = () => {
    if (!user) {
      setDialogVisible(true);
    } else {
      navigation.navigate("Reviews");
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleBadgePress}
            testID="avatar-horizontal"
          >
            <AvatarHorizontal user={user} />
          </TouchableOpacity>
          <View style={styles.mainOptions}>
            <View style={styles.menuHorizontal}>
              <TouchableOpacity style={{ flex: 1 }}>
                <IconButton icon="bookmark" title="즐겨찾기?" />
              </TouchableOpacity>
              <VerticalDivider />
              <TouchableOpacity style={{ flex: 1 }}>
                <IconButton icon="history" title="최근 본?" />
              </TouchableOpacity>
              <VerticalDivider />
              <TouchableOpacity style={{ flex: 1 }} onPress={handleReviewPress}>
                <IconButton icon="star" title="리뷰" />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Divider />
            </View>
            <View style={styles.menuHorizontal}>
              <View style={styles.benefits}>
                <TabButton
                  title="쿠폰함"
                  detail={`${user === null ? 0 : user.num_coupons} 장`}
                  onPress={handleCouponPress}
                  showArrow
                />
              </View>
              <VerticalDivider />
              <View style={styles.benefits}>
                <TabButton
                  title="포인트"
                  detail={`${user === null ? 0 : user.total_points} P`}
                  onPress={handlePointPress}
                  showArrow
                />
              </View>
            </View>
          </View>
          {user === null ? null : (
            <View style={styles.registerButtons}>
              <Button
                mode="elevated"
                onPress={() => navigation.navigate("CoachRegister")}
                style={{ flex: 1, marginRight: 5 }}
                textColor="white"
                buttonColor="green"
              >
                코치 등록하기
              </Button>
              <Button
                mode="elevated"
                onPress={() => navigation.navigate("FacilityRegister")}
                style={{ flex: 1, marginLeft: 5 }}
                textColor="white"
                buttonColor="green"
              >
                시설 등록하기
              </Button>
            </View>
          )}
          <View style={styles.others}>
            <Divider style={styles.divider} />
            <Text variant="titleLarge" style={styles.subtitle}>
              이벤트
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                mode="text"
                onPress={() => {}}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                친구 초대하기
              </Button>
              <Button
                mode="text"
                onPress={() => {}}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                레슨 코치 초대하기
              </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                mode="text"
                onPress={() => {}}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                매장 정보 제보하기
              </Button>
              <View style={{ flex: 1 }} />
            </View>
            <Divider style={styles.divider} />
            <Text variant="titleLarge" style={styles.subtitle}>
              결제
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                mode="text"
                onPress={handlePaymentsPress}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                결제수단 관리
              </Button>
              <View style={{ flex: 1 }} />
            </View>
            <Divider style={styles.divider} />
            <Text variant="titleLarge" style={styles.subtitle}>
              고객센터 및 설정
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                mode="text"
                onPress={() => {}}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                1:1 문의
              </Button>
              <Button
                mode="text"
                onPress={() => navigation.navigate("FAQ")}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                자주 묻는 질문
              </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                mode="text"
                onPress={() => {}}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                알림 맞춤 설정
              </Button>
              <Button
                mode="text"
                onPress={() => {}}
                style={{ flex: 1 }}
                labelStyle={styles.labelText}
              >
                ..?
              </Button>
            </View>
            <Divider style={styles.divider} />
          </View>
        </View>
      </ScrollView>
      <LoginDialog
        visible={dialogVisible}
        title="로그인"
        contents="로그인이 필요한 서비스입니다."
        onClose={() => setDialogVisible(false)}
      />
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
  },
  menuHorizontal: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  others: {
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
  registerButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginHorizontal: 20,
  },
  benefits: {
    flex: 1,
    marginVertical: 5,
    paddingRight: 5,
  },
  labelText: {
    fontSize: 20,
    color: "black",
  },
});
