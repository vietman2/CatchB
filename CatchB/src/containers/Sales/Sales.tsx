import MonthlySales from "../../components/Sales/MonthlySales";
import DailySales from "../../components/Sales/DailySales";
import { DailySalesList } from "../../variables/mvp_dummy_data/sales";

export default function Sales() {
  return (
    <>
      <MonthlySales />
      <DailySales sales={DailySalesList[0]} />
      <DailySales sales={DailySalesList[1]} />
      <DailySales sales={DailySalesList[2]} />
    </>
  );
}
