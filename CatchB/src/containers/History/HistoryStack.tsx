import { createStackNavigator } from "@react-navigation/stack";

import HistoryMain from "./Main/HistoryMain";
import { HistoryStackParamList } from "../../variables/navigation";

const HistoryStack = createStackNavigator<HistoryStackParamList>();

export default function HistoryContainer() {
  return (
    <HistoryStack.Navigator
      initialRouteName="HistoryScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HistoryStack.Screen name="HistoryScreen" component={HistoryMain} />
    </HistoryStack.Navigator>
  );
}
