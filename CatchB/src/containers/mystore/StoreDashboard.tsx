import { View, StyleSheet } from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { Divider, Text } from "react-native-paper";

import { themeColors } from "../../variables/colors";

export default function StoreDashboard() {
  const data = [
    { value: 10, label: "2023년 9월" },
    { value: 20, label: "2023년 10월" },
    { value: 30, label: "2023년 11월" },
  ];

  const pieData = [
    { value: 19, label: "성공", color: themeColors.success },
    { value: 1, label: "실패", color: themeColors.failure },
  ];

  const getSuccessRate = () => {
    const success = pieData[0].value;
    const failure = pieData[1].value;
    const total = success + failure;
    return `${Math.round((success / total) * 100)}%`;
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        color={themeColors.primary}
        dataPointsColor={themeColors.primary}
        thickness={3}
        adjustToWidth
      />
      <Divider style={{ marginTop: 20 }} />
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text variant="headlineSmall">총 매출</Text>
          <Text variant="headlineSmall">0원</Text>
        </View>
        <View>
          <Text variant="headlineSmall">총 예약</Text>
          <Text variant="headlineSmall">0건</Text>
        </View>
        <View>
          <Text variant="headlineSmall">총 코치</Text>
          <Text variant="headlineSmall">0명</Text>
        </View>
      </View>
      <Divider style={{ marginTop: 20 }} />
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <View>
          <PieChart
            data={pieData}
            donut
            radius={50}
            innerRadius={35}
            centerLabelComponent={() => {
              return (
                <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                  {getSuccessRate()}
                </Text>
              );
            }}
          />
          <Text variant="headlineSmall">재예약률</Text>
        </View>
        <View>
          <PieChart
            data={pieData}
            donut
            radius={50}
            innerRadius={35}
            centerLabelComponent={() => {
              return (
                <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                  {getSuccessRate()}
                </Text>
              );
            }}
          />
          <Text variant="headlineSmall">시설 코치 평점</Text>
        </View>
        <View>
          <PieChart
            data={pieData}
            donut
            radius={50}
            innerRadius={35}
            centerLabelComponent={() => {
              return (
                <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
                  {getSuccessRate()}
                </Text>
              );
            }}
          />
          <Text variant="headlineSmall">시설 평점</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
    padding: 5,
  },
});
