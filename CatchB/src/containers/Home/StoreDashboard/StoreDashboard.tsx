import { ScrollView, StyleSheet, View } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";
import {
  BarChart,
  CurveType,
  LineChart,
  PieChart,
} from "react-native-gifted-charts";

import StatsCard from "../../../components/Cards/StatsCard";

export default function StoreDashboard() {
  const monthlyData = [
    {
      label: "2023년",
      value: 323,
    },
    {
      value: 217,
    },
    {
      value: 270,
    },
    {
      value: 324,
    },
    {
      value: 350,
    },
    {
      value: 385,
    },
    {
      value: 378,
    },
    {
      value: 356,
    },
    {
      value: 299,
    },
    {
      value: 275,
    },
    {
      value: 230,
    },
    {
      value: 280,
    },
    {
      label: "2024년",
      value: 312,
    },
    {
      value: 293,
    },
  ];

  const ageData = [
    {
      label: "10대",
      value: 82,
    },
    {
      label: "20대",
      value: 133,
    },
    {
      label: "30대",
      value: 64,
    },
    {
      label: "40대",
      value: 32,
    },
    {
      label: "50대",
      value: 12,
    },
    {
      label: "60대",
      value: 14,
    },
  ];

  const reservationData = [
    {
      label: "취소",
      value: 12,
      color: "red",
    },
    {
      label: "예약",
      value: 88,
      color: "green",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.box}>
        <Text variant="titleLarge" style={styles.title}>
          고객 만족도
        </Text>
        <ScrollView horizontal>
          <StatsCard
            title="평점"
            content="8.9/10"
            icon="star"
            iconColor="gold"
          />
          <StatsCard title="청결도 평가" content="4.8/5" />
          <StatsCard title="재이용률" content="85%" />
          <StatsCard title="재방문률" content="62%" />
        </ScrollView>
      </Surface>
      <Surface style={styles.box}>
        <Text variant="titleLarge" style={styles.title}>
          예약 취소
        </Text>
        <View style={{ padding: 20 }}>
          <PieChart data={reservationData} radius={70} focusOnPress />
        </View>
      </Surface>
      <Surface style={styles.box}>
        <Text variant="titleLarge" style={styles.title}>
          우리 매장 이용 연령대 (최근 30일간)
        </Text>
        <BarChart data={ageData} xAxisLength={300} frontColor="green" />
      </Surface>
      <Surface style={styles.box}>
        <Text variant="titleLarge" style={styles.title}>
          월별 이용자 수
        </Text>
        <LineChart
          data={monthlyData}
          hideDataPoints
          curveType={CurveType.QUADRATIC}
          curved
          xAxisLength={300}
          yAxisOffset={200}
          initialSpacing={0}
          showVerticalLines
          color="green"
        />
      </Surface>
      <Surface style={styles.box}>
        <Text variant="titleLarge" style={styles.title}>
          가장 많이 팔린 상품
        </Text>
      </Surface>
      <Surface style={styles.box}>
        <Text variant="titleLarge" style={styles.title}>
          주 이용 시간대
        </Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  box: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});
