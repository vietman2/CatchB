import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";

import { themeColors } from "../../../variables/colors";

type DailySalesInfo = {
  date: string;
  totalSales: number;
  individualSales: {
    name: string;
    sales: number;
  }[];
};

const DailySalesList: DailySalesInfo[] = [
  {
    date: "2021-09-01",
    totalSales: 100000,
    individualSales: [
      {
        name: "김동혁",
        sales: 50000,
      },
      {
        name: "김준수",
        sales: 50000,
      },
    ],
  },
  {
    date: "2021-09-02",
    totalSales: 200000,
    individualSales: [
      {
        name: "황윤규",
        sales: 100000,
      },
      {
        name: "정승원",
        sales: 100000,
      },
    ],
  },
  {
    date: "2021-09-03",
    totalSales: 300000,
    individualSales: [
      {
        name: "홍승우",
        sales: 150000,
      },
      {
        name: "이정호",
        sales: 150000,
      },
    ],
  },
];

interface Props {
  sales: DailySalesInfo;
}

function DailySales({ sales }: Readonly<Props>) {
  const renderDate = () => {
    // date is given in YYYY-MM-DD format
    // change to YYYY년 MM월 DD일 format
    return `${sales.date.slice(0, 4)}년 ${sales.date.slice(
      5,
      7
    )}월 ${sales.date.slice(8, 10)}일`;
  };

  const renderNumberWithCommas = (number: number) => {
    // print number with commas
    // without using regex
    const numberString = number.toString();
    let result = "";
    let count = 0;
    for (let i = numberString.length - 1; i >= 0; i--) {
      if (count === 3) {
        result = "," + result;
        count = 0;
      }
      result = numberString[i] + result;
      count++;
    }
    return result;
  };

  const renderTotalSales = () => {
    return (
      <View style={styles.line}>
        <Text variant="titleSmall" style={styles.bold}>
          매출
        </Text>
        <Text style={styles.bold}>
          {renderNumberWithCommas(sales.totalSales)}원
        </Text>
      </View>
    );
  };

  const renderIndividualSales = ({
    name,
    sales,
  }: {
    name: string;
    sales: number;
  }) => {
    return (
      <View style={styles.line} key={name + sales}>
        <Text>{name} 님</Text>
        <Text>{renderNumberWithCommas(sales)}원</Text>
      </View>
    );
  };

  return (
    <View style={styles.container} key={sales.date}>
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

export function Sales() {
  return (
    <ScrollView>
      <View style={styles.box}>
        <View style={styles.line1}>
          <Text>2023년 9월</Text>
          <TouchableOpacity style={styles.calendar}>
            <Icon source="calendar-blank-outline" size={14} />
            <Text> 월 선택</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line2}>
          <Text variant="titleLarge">총 매출</Text>
          <Text variant="headlineSmall" style={styles.sales}>
            10,254,500원
          </Text>
        </View>
      </View>
      <DailySales sales={DailySalesList[0]} />
      <DailySales sales={DailySalesList[1]} />
      <DailySales sales={DailySalesList[2]} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 15,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: themeColors.tertiaryContainer,
    borderRadius: 10,
  },
  line1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendar: {
    backgroundColor: themeColors.primaryContainer,
    borderRadius: 5,
    flexDirection: "row",
    padding: 5,
    marginTop: -5,
  },
  line2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  sales: {
    marginTop: 5,
    fontWeight: "bold",
  },
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
  },
});
