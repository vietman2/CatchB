import { DailySalesInfo } from "../types";

export const DailySalesList: DailySalesInfo[] = [
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
