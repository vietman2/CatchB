import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-paper";
import { themeColors } from "../../variables/colors";

export type DailySalesInfo = {
  date: string;
  totalSales: number;
  individualSales: {
    name: string;
    sales: number;
  }[];
};

interface Props {
  sales: DailySalesInfo;
}

export default function DailySales({ sales }: Props) {
  const renderDate = () => {
    // date is given in YYYY-MM-DD format
    // change to YYYY년 MM월 DD일 format
    return `${sales.date.slice(0, 4)}년 ${sales.date.slice(
      5,
      7
    )}월 ${sales.date.slice(8, 10)}일`;
  };

  const renderNumberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const renderTotalSales = () => {
    return (
      <View style={styles.line}>
        <Text variant="titleSmall" style={styles.bold}>매출</Text>
        <Text style={styles.bold}>{renderNumberWithCommas(sales.totalSales)}원</Text>
      </View>
    );
  }

  const renderIndividualSales = ({ name, sales }: {name: string, sales: number}) => {
    return (
      <View style={styles.line}>
        <Text>{name} 님</Text>
        <Text>{renderNumberWithCommas(sales)}원</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text>{renderDate()}</Text>
        <TouchableOpacity style={styles.details}>
          <Text>상세보기</Text>
          <Icon source="chevron-right" size={14} />
        </TouchableOpacity>
      </View>
      {renderTotalSales()}
      {sales.individualSales.map((sales) => renderIndividualSales(sales))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
    padding: 20,
    backgroundColor: themeColors.primaryContainer,
    borderRadius: 10,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  }
});
