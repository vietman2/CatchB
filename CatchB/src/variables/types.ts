export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export type DailySalesInfo = {
  date: string;
  totalSales: number;
  individualSales: {
    name: string;
    sales: number;
  }[];
};

