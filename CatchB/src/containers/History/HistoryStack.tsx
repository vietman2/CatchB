import { createStackNavigator } from "@react-navigation/stack";

import HistoryMain from "./Main";
import { SmallLogo } from "../../components/Logos";
import { HistoryParams } from ".constants/navigation";

const HistoryStack = createStackNavigator<HistoryParams>();

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
