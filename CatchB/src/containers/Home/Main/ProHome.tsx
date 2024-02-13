import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Icon, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

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

export default function ProHome() {
  const [hide, setHide] = useState(false);
  const width = Dimensions.get("window").width;
  const cardWidth = (width - 20) / 2 - 35;

  function StoreNotificationChip({ label }: { label: string }) {
    return (
      <View
        style={[
          styles.notificationChip,
          {
            backgroundColor: "rgba(64, 196, 20, 0.35)",
          },
        ]}
      >
        <Icon source="store-check" size={24} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "gray", marginBottom: 5 }}>가게관리</Text>
          <Text>{label}</Text>
        </View>
      </View>
    );
  }

  function WorkerNotificationChip({ label }: { label: string }) {
    return (
      <View
        style={[
          styles.notificationChip,
          {
            backgroundColor: "rgba(57, 167, 255, 0.35)",
          },
        ]}
      >
        <Icon source="table-account" size={24} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "gray", marginBottom: 5 }}>직원관리</Text>
          <Text>{label}</Text>
        </View>
      </View>
    );
  }

  function ReservationNotificationChip({ label }: { label: string }) {
    return (
      <View
        style={[
          styles.notificationChip,
          {
            backgroundColor: "rgba(255, 57, 57, 0.35)",
          },
        ]}
      >
        <Icon source="calendar-clock" size={24} />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "gray", marginBottom: 5 }}>예약관리</Text>
          <Text>{label}</Text>
        </View>
      </View>
    );
  }

  function AlertIcon() {
    return <Icon source="bell-alert-outline" size={24} />;
  }

  function StatsIcon() {
    return <Icon source="chart-bar" size={24} />;
  }

  function AIIcon() {
    return <Icon source="head-snowflake-outline" size={24} />;
  }

  function ShowHideIcon() {
    return <Icon source={hide ? "chevron-up" : "chevron-down"} size={24} />;
  }

  function StatsCard({
    title,
    stat,
    summary,
    good,
  }: {
    title: string;
    stat: string;
    summary: string;
    good?: boolean;
  }) {
    return (
      <View
        style={[
          styles.statsCard,
          { width: cardWidth },
          good
            ? { backgroundColor: "rgba(64, 196, 20, 0.3)" }
            : { backgroundColor: "rgba(255, 57, 57, 0.3)" },
        ]}
      >
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginBottom: 5 }}
        >
          {title}
        </Text>
        <Text
          variant="titleLarge"
          style={[{ fontWeight: "bold" }, { color: good ? "green" : "red" }]}
        >
          {stat}
        </Text>
        <Text variant="titleMedium" style={{ marginTop: 5 }}>
          {summary}
        </Text>
      </View>
    );
  }

  const renderNotification = (notification: Notification) => {
    if (notification.type === "store") {
      return <StoreNotificationChip label={notification.label} />;
    } else if (notification.type === "worker") {
      return <WorkerNotificationChip label={notification.label} />;
    } else {
      return <ReservationNotificationChip label={notification.label} />;
    }
  };

  return (
    <ScrollView style={styles.container}>
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
              <View key={index}>{renderNotification(notification)}</View>
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
      <View style={styles.ads}>
        <Text variant="displayMedium" style={{ color: "yellow" }}>
          광고
        </Text>
      </View>
      <Card style={styles.card}>
        <Card.Title
          title="우리 가게 실적"
          titleVariant="headlineSmall"
          titleStyle={styles.title}
          left={StatsIcon}
          leftStyle={{ marginRight: 0 }}
        />
        <Card.Content>
          <Text>Good</Text>
          <View style={{ flexDirection: "row" }}>
            <StatsCard
              title="최근 3개월 평점"
              stat="9.8/10.0"
              summary="상위 10% 이내"
              good
            />
            <StatsCard
              title="예약 접수 시간"
              stat="4분 미만"
              summary="상위 4% 이내"
              good
            />
          </View>
          <Text>Bad</Text>
          <View style={{ flexDirection: "row" }}>
            <StatsCard
              title="취소율"
              stat="5%"
              summary="하위 10% 미만"
              good={false}
            />
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title
          title="Catch B AI 컨설팅"
          titleVariant="headlineSmall"
          titleStyle={styles.title}
          left={AIIcon}
          leftStyle={{ marginRight: 0 }}
        />
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 10 }}>
            Catch B AI 컨설팅을 통해 가게의 실적을 높여보세요. AI가 가게의
            실적을 분석하여 가게에 맞는 최적의 전략을 제시해드립니다.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.primaryContainer,
  },
  ads: {
    marginTop: 10,
    backgroundColor: "blue",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  notificationChip: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
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
  statsCard: {
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
});
