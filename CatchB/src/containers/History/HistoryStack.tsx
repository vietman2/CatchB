import { createStackNavigator } from "@react-navigation/stack";

import HistoryMain from "./Main/HistoryMain";
import { SmallLogo } from "../../components/Logos";
import { HistoryStackParamList } from "../../variables/navigation";

const HistoryStack = createStackNavigator<HistoryStackParamList>();

export default function HistoryContainer() {
  return (
    <HistoryStack.Navigator
      initialRouteName="HistoryScreen"
      screenOptions={{
        headerLeft: SmallLogo,
        headerTitle: () => {
          return null;
        },
        headerRight: null,
        headerShadowVisible: false,
      }}
    >
      <HistoryStack.Screen name="HistoryScreen" component={HistoryMain} />
    </HistoryStack.Navigator>
  );
}
