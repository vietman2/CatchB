import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Button, Divider, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";

import AvatarHorizontal from "../../../components/Avatar/AvatarHorizontal";
import IconButton from "../../../components/Buttons/IconButton";
import TabButton from "../../../components/Buttons/TabButton";
import VerticalDivider from "../../../components/Divider/VerticalDivider";
import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";
import { MyPageStackScreenProps } from "../../../variables/navigation";

export default function MyPageMain() {
  const navigation =
    useNavigation<MyPageStackScreenProps<"MyPageScreen">["navigation"]>();
  const user = useSelector((state: RootState) => state.auth.user);

  const LoginAlert = () => {
    Alert.alert(
      "로그인이 필요한 서비스입니다.",
      "로그인 화면으로 이동하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          isPreferred: true,
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  };

  const handleBadgePress = () => {
    if (user) {
      navigation.navigate("Profile");
    } else {
      navigation.navigate("Login");
    }
  };

  const handleCouponPress = () => {
    if (!user) {
      LoginAlert();
      return;
    } else {
      navigation.navigate("CouponList");
    }
  };

  const handlePointPress = () => {
    if (!user) {
      LoginAlert();
      return;
    } else {
      navigation.navigate("Points");
    }
  };

  const handlePaymentsPress = () => {
    if (!user) {
      LoginAlert();
      return;
    } else {
      navigation.navigate("Payments");
    }
  };

  const handleReviewPress = () => {
    if (!user) {
      LoginAlert();
      return;
    } else {
      navigation.navigate("Reviews");
    }
  };

  const handleFacilityRegisterPress = () => {
    if (!user) {
      LoginAlert();
      return;
    } else {
      navigation.navigate("FacilityRegister");
    }
  };

  const handleCoachRegisterPress = () => {
    if (!user) {
      LoginAlert();
      return;
    } else {
      navigation.navigate("CoachRegister");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBadgePress} testID="avatar-horizontal">
          <AvatarHorizontal user={user} />
        </TouchableOpacity>
        <View style={styles.progress}>
          <Text variant="titleSmall">프로필 완성도: {"50%"}</Text>
          <ProgressBar progress={0.5} color="green" />
        </View>
        <View style={styles.mainOptions}>
          <View style={styles.menuHorizontal}>
            <TouchableOpacity style={{ flex: 1 }}>
              <IconButton icon="bookmark" title="찜" />
            </TouchableOpacity>
            <VerticalDivider />
            <TouchableOpacity style={{ flex: 1 }} onPress={handlePaymentsPress}>
              <IconButton
                icon="credit-card-multiple-outline"
                title="결제수단"
              />
            </TouchableOpacity>
            <VerticalDivider />
            <TouchableOpacity style={{ flex: 1 }} onPress={handleReviewPress}>
              <IconButton icon="comment-processing" title="리뷰" />
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
        <View style={styles.others}>
          <Divider style={styles.divider} />
          <Text variant="titleLarge" style={styles.subtitle}>
            업그레이드
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              mode="text"
              onPress={handleCoachRegisterPress}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              코치 등록하기
            </Button>
            <Button
              mode="text"
              onPress={handleFacilityRegisterPress}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              시설 등록하기
            </Button>
          </View>
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
        </View>
        <View style={{ paddingHorizontal: 10 }}>
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
              공지사항
            </Button>
            <Button
              mode="text"
              onPress={() => navigation.navigate("FAQ")}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              1:1 문의
            </Button>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              mode="text"
              onPress={() => {}}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              자주 묻는 질문
            </Button>
            <Button
              mode="text"
              onPress={() => {}}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              알림 맞춤 설정
            </Button>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              mode="text"
              onPress={() => {}}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              약관 및 정책
            </Button>
            <Button
              mode="text"
              onPress={() => {}}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              현재 버전 0.0.0:Beta
            </Button>
          </View>
          <Divider style={styles.divider} />
        </View>
      </View>
    </ScrollView>
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
    borderColor: "silver",
  },
  menuHorizontal: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  progress: {
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: "flex-end",
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
