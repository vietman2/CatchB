import { View, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";
import { PieChart } from "react-native-gifted-charts";

import { themeColors } from ".themes/colors";

interface Props {
  done: number;
  total: number;
}

export const ProgressBanner = ({ done, total }: Props) => {
  const getRate = () => {
    return `${Math.round((done / total) * 100)}%`;
  };

  return (
    <View style={styles.banner}>
      <Text variant="headlineSmall" style={{ color: "white" }}>
        오늘의 전체 업무 중
      </Text>
      <Text
        variant="headlineSmall"
        style={{ fontWeight: "bold", color: "white", marginTop: 5 }}
      >{`${getRate()} 완료했습니다 :)`}</Text>
    </View>
  );
};

export const CheckStatus = ({ done, total }: Props) => {
  const getData = () => {
    return [
      { value: done, label: "완료", color: themeColors.primary },
      { value: total - done, label: "미완료", color: themeColors.outline },
    ];
  };
  function CenterLabel() {
    const getRate = () => {
      return `${Math.round((done / total) * 100)}%`;
    };
    return <Text>{getRate()}</Text>;
  }

  return (
    <View style={styles.status}>
      <View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text variant="headlineSmall">오늘의 체크 항목</Text>
          <Icon source="chevron-right" size={26} />
        </View>
        <Text variant="titleMedium">
          전체 <Text style={{ color: themeColors.primary }}>{total}</Text>개
          항목 중
        </Text>
        <Text variant="titleMedium">
          <Text style={{ color: themeColors.primary }}>{done}</Text>개 항목 완료
        </Text>
      </View>
      <PieChart
        data={getData()}
        innerRadius={30}
        radius={40}
        donut
        centerLabelComponent={CenterLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: themeColors.primary,
    margin: 10,
    padding: 15,
    borderRadius: 15,
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: themeColors.primaryContainer,
    margin: 10,
    padding: 15,
    borderRadius: 15,
  },
});
