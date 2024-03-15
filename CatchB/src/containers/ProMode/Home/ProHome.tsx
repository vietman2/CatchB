import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Icon, Text } from "react-native-paper";

import { NotificationChip } from "./components";
import { HomeCard } from "../../../components/Cards";
import { themeColors } from ".themes/colors";

type Notification = {
  type: "store" | "worker" | "reservation";
  label: string;
};

const notifications: Notification[] = [
  {
    type: "store",
    label: "미확정한 예약이 3건 있습니다.",
  },
  {
    type: "reservation",
    label: "코치 급여일 3일 전입니다.",
  },
  {
    type: "worker",
    label: "임대료 입금일 4일 전입니다.",
  },
  {
    type: "worker",
    label: "오늘 직원 1명의 생일입니다.",
  },
];

export function ProHome() {
  const [hide, setHide] = useState(true);

  function AlertIcon() {
    return <Icon source="bell-alert-outline" size={24} />;
  }

  function ShowHideIcon() {
    return <Icon source={hide ? "chevron-down" : "chevron-up"} size={24} />;
  }

  const image = {
    uri: "https://files.oaiusercontent.com/file-Uk2ehUrgmoihJwSm6ZZKYeo0?se=2024-02-15T01%3A19%3A40Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D68765414-ad4e-4cc2-8401-5d54c9248ef0.webp&sig=/2IeZOGdDhJxu/65%2BdO8Mh0L7OP9u/Dz/pNBPWGEWi8%3D",
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} style={{ width: "100%", height: 220 }}>
        <ScrollView
          horizontal
          style={{
            marginLeft: 10,
            paddingVertical: 20,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <HomeCard
            title={"아카데미\n파워랭킹"}
            content="서울 2위, 전국 3위"
            type={1}
            actionText="자세히 보기"
            action={() => {}}
            icon="trophy"
          />
          <HomeCard
            title="서울대 야구부"
            content="오늘 오후 3시~7시"
            type={2}
            chip="대관"
          />
          <HomeCard
            title="김동혁"
            content={"오늘 오후 7시~8시반\n홍승우 코치"}
            type={2}
            chip="레슨"
          />
          <HomeCard
            title="AI 컨설팅"
            content="Catch B AI를 통해 가게의 실적을 높여보세요."
            actionText="더 알아보기"
            action={() => {}}
            type={3}
          />
          <HomeCard
            title="예약률: 72%"
            content="우리 가게 통계"
            actionText="더 많은 통계 확인"
            action={() => {}}
            type={4}
          />
          <HomeCard
            title="커뮤니티"
            content="사장님들을 위한 전용 커뮤니티를 이용해보세요"
            type={1}
          />
        </ScrollView>
      </ImageBackground>
      <ScrollView
        horizontal
        style={styles.ads}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.ad, { backgroundColor: "black" }]}>
          <Text variant="displayMedium" style={{ color: "yellow" }}>
            광고 1
          </Text>
        </View>
        <View style={[styles.ad, { backgroundColor: "lightblue" }]}>
          <Text variant="displayMedium" style={{ color: "orange" }}>
            광고 2
          </Text>
        </View>
        <View style={[styles.ad, { backgroundColor: "green" }]}>
          <Text variant="displayMedium" style={{ color: "red" }}>
            광고 3
          </Text>
        </View>
        <View style={[styles.ad, { backgroundColor: "gray" }]}>
          <Text variant="displayMedium" style={{ color: "black" }}>
            광고 4
          </Text>
        </View>
      </ScrollView>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => setHide(!hide)} testID="hide-press">
          <Card.Title
            title={`오늘의 알림 (${4})`}
            titleVariant="headlineSmall"
            titleStyle={styles.title}
            left={AlertIcon}
            leftStyle={{ marginRight: 0 }}
            right={ShowHideIcon}
            rightStyle={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        {hide ? null : (
          <View style={{ paddingHorizontal: 5 }}>
            {notifications.slice(0, 3).map((notification, index) => (
              <NotificationChip
                type={notification.type}
                key={index}
                label={notification.label}
              />
            ))}
            {notifications.length > 3 && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 5,
                }}
              >
                <Icon source="plus" size={24} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </Card>
      <View style={{ marginHorizontal: 20 }}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          동영상 코칭
        </Text>
        <Text variant="titleMedium">
          야구인들의 영상에 피드백을 남기고 포인트를 적립하세요.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.primaryContainer,
  },
  ads: {
    marginTop: 10,
    height: 100,
    width: "95%",
    borderRadius: 10,
    alignSelf: "center",
  },
  ad: {
    width: Dimensions.get("window").width * 0.95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  statsCard: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    paddingBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginTop: 4,
  },
});
