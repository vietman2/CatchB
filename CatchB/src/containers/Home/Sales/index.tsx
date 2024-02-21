import { ScrollView } from "react-native";

import Monthly from "./Monthly";
import Daily from "./Daily";
import { DailySalesList } from "../../../variables/mvp_dummy_data/sales";

export default function Sales() {
  return (
    <ScrollView>
      <Monthly />
      <Daily sales={DailySalesList[0]} />
      <Daily sales={DailySalesList[1]} />
      <Daily sales={DailySalesList[2]} />
    </ScrollView>
  );
}
