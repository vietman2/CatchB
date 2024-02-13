import { View, StyleSheet } from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { Divider, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

type PieData = {
  value: number;
  label: string;
  color: string;
};

function CenterComponent({ pieData }: Readonly<{ pieData: PieData }>) {
  const getSuccessRate = () => {
    const success = pieData[0].value;
    const failure = pieData[1].value;
    const total = success + failure;
    return `${Math.round((success / total) * 100)}%`;
  };

  return (
    <Text variant="headlineSmall" style={styles.bold}>
      {getSuccessRate()}
    </Text>
  );
}

export default function StoreDashboard() {
  const data = [
    { value: 10, label: "2023년 9월" },
    { value: 20, label: "2023년 10월" },
    { value: 30, label: "2023년 11월" },
  ];

  const pieData = [
    { value: 19, label: "성공", color: "green" },
    { value: 1, label: "실패", color: "red" },
  ];

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        color={themeColors.primary}
        dataPointsColor={themeColors.primary}
        thickness={3}
        adjustToWidth
      />
      <Divider style={styles.divider} />
      <View style={styles.group}>
        <View>
          <Text variant="headlineSmall">예약 건수</Text>
          <Text variant="headlineSmall">1,364(0)</Text>
        </View>
        <View>
          <Text variant="headlineSmall">지난 월 대비 매출</Text>
          <Text variant="headlineSmall">+350,000원</Text>
        </View>
        <View>
          <Text variant="headlineSmall">문의</Text>
          <Text variant="headlineSmall">97</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.group}>
        <View>
          <PieChart
            data={pieData}
            donut
            radius={50}
            innerRadius={35}
            centerLabelComponent={CenterComponent}
          />
          <Text variant="headlineSmall">재예약률</Text>
        </View>
        <View>
          <PieChart
            data={pieData}
            donut
            radius={50}
            innerRadius={35}
            centerLabelComponent={CenterComponent}
          />
          <Text variant="headlineSmall">시설 코치 평점</Text>
        </View>
        <View>
          <PieChart
            data={pieData}
            donut
            radius={50}
            innerRadius={35}
            centerLabelComponent={CenterComponent}
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
  divider: {
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  group: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
});
