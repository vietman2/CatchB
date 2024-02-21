import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Button, Divider, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";

import { MainProfile } from "../../../components/Profile";
import { IconTextButton } from "../../../components/Buttons";
import TabButton from "../../../components/Buttons/TabButton";
import { VerticalDivider } from "../../../components/Divider";
import { RootState } from "../../../store/store";
import { themeColors } from "../../../variables/colors";
import { MyPageStackScreenProps } from "../../../variables/navigation";

export default function MyPageMain() {
  const { start } = useTourGuideController();
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
    } else {
      navigation.navigate("CouponList");
    }
  };

  const handlePointPress = () => {
    if (!user) {
      LoginAlert();
    } else {
      navigation.navigate("Points");
    }
  };

  const handlePaymentsPress = () => {
    if (!user) {
      LoginAlert();
    } else {
      navigation.navigate("Payments");
    }
  };

  const handleReviewPress = () => {
    if (!user) {
      LoginAlert();
    } else {
      navigation.navigate("Reviews");
    }
  };

  const handleFacilityRegisterPress = () => {
    if (!user) {
      LoginAlert();
    } else {
      navigation.navigate("RegisterPro", {
        title: "아카데미 등록",
        type: "facility",
      });
    }
  };

  const handleCoachRegisterPress = () => {
    if (!user) {
      LoginAlert();
    } else {
      navigation.navigate("RegisterPro", {
        title: "코치 등록",
        type: "coach",
      });
    }
  };

  const handleInvitePress = () => {
    if (!user) {
      LoginAlert();
    } else {
      Share.share({
        message: "ㅎㅇㅎㅇ",
        title: "초대하기",
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TourGuideZone zone={1} text="CatchB에 오신 것을 환영합니다!">
          <TouchableOpacity
            onPress={handleBadgePress}
            testID="avatar-horizontal"
          >
            <MainProfile user={user} />
          </TouchableOpacity>
        </TourGuideZone>
        <View style={styles.progress}>
          <TourGuideZone
            zone={2}
            text="프로필을 완성하면 3,000 포인트를 드려요!"
          >
            <Text variant="titleSmall">프로필 완성도: {"70%"}</Text>
            <ProgressBar progress={0.7} color="green" />
          </TourGuideZone>
        </View>
        <View style={styles.mainOptions}>
          <View style={styles.menuHorizontal}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => start()}>
              <IconTextButton icon="bookmark" title="찜" />
            </TouchableOpacity>
            <VerticalDivider />
            <TouchableOpacity style={{ flex: 1 }} onPress={handlePaymentsPress}>
              <IconTextButton
                icon="credit-card-multiple-outline"
                title="결제수단"
              />
            </TouchableOpacity>
            <VerticalDivider />
            <TouchableOpacity style={{ flex: 1 }} onPress={handleReviewPress}>
              <IconTextButton icon="comment-processing" title="리뷰" />
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
              onPress={handleInvitePress}
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
            <Button
              mode="text"
              onPress={() => {}}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              진행중인 이벤트
            </Button>
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
              onPress={() => {}}
              style={{ flex: 1 }}
              labelStyle={styles.labelText}
            >
              1:1 문의
            </Button>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              mode="text"
              onPress={() => navigation.navigate("FAQ")}
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
              제휴 문의하기
            </Button>
          </View>
          <Divider style={styles.divider} />
          <Button
            mode="text"
            onPress={() => {}}
            style={{ flex: 1 }}
            labelStyle={styles.labelText}
          >
            현재 버전: Beta 0.0.0
          </Button>
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
    textAlign: "left",
  },
});
