import { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Banner, Icon, Text } from "react-native-paper";

import IconTab from "../../components/IconTab";
import { NotificationChip } from "../../components/Chips";
import { Box, SimpleCard } from "../../components/Card";
import { themeColors } from "../../variables/colors";
import { RootState } from "../../store/store";

export default function Home() {
  const [visible, setVisible] = useState(true);
  const mode = useSelector((state: RootState) => state.mode.mode);

  const AdContainer = () => {
    if (mode === "basic") {
      return (
        <View style={styles.ads}>
          <Text variant="displayMedium" style={{ color: "yellow" }}>
            일반모드
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.ads}>
          <Text variant="displayMedium" style={{ color: "yellow" }}>
            프로모드
          </Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {visible ? null : (
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{ flex: 1, alignItems: "center" }}
          testID="banner"
        >
          <Icon source="menu-down-outline" size={24} />
        </TouchableOpacity>
      )}
      <Banner
        visible={visible}
        actions={[
          {
            label: "닫기",
            onPress: () => setVisible(false),
          },
        ]}
        icon="bullhorn-outline"
      >
        <Text variant="headlineSmall">
          {"예약접수율이 좋아지려면?\n\n"}
          <Text variant="labelLarge">CatchB 컨설턴팅 서비스를 이용해보세요!</Text>
        </Text>
      </Banner>
      <AdContainer />
      <SimpleCard title={"오늘의 알림"} icon="bell-alert-outline">
        <View style={{ paddingHorizontal: 5 }}>
          <NotificationChip
            text="초록 배경 + 검정 텍스트 + 오른쪽 빨간 점"
            icon="bell-alert-outline"
            backgroundColor="rgba(64, 196, 20, 0.2)"
            textColor="rgb(0, 0, 0)"
            redDot={true}
          />
          <NotificationChip
            text="(예시) 미확정한 예약이 3건 있습니다."
            icon="bell-alert-outline"
            backgroundColor="rgba(64, 196, 20, 0.2)"
            textColor="rgb(0, 0, 0)"
            redDot={true}
          />
          <NotificationChip
            text="(예시) 코치 급여일 3일 전입니다."
            icon="bell-alert-outline"
            backgroundColor="rgba(64, 196, 20, 0.2)"
            textColor="rgb(0, 0, 0)"
            redDot={true}
          />
        </View>
      </SimpleCard>
      <SimpleCard title="전체 메뉴" icon="menu">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <IconTab icon="form-select" title="예약관리" />
          <IconTab icon="storefront-outline" title="가게관리" />
          <IconTab icon="pencil" title="리뷰관리" />
          <IconTab icon="cog-outline" title="앱 설정" />
        </View>
      </SimpleCard>
      <SimpleCard title="우리가게 Now" icon="store-outline">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: 10,
          }}
        >
          <Box
            title="최근 3개월 평점"
            data="4.9"
            description="상위 5%"
            icon="star"
            iconColor="gold"
          />
          <Box title="예약접수시간" data="2분" description="상위 10%" />
        </View>
      </SimpleCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.primaryContainer,
  },
  ads: {
    marginTop: 20,
    backgroundColor: "blue",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
