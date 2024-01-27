import { createStackNavigator } from "@react-navigation/stack";

import CalendarMain from "./Main/CalendarMain";
import { leftTitle, rightTitle } from "../../components/Logos/TopBar";
import { CalendarStackParamList } from "../../variables/navigation";

const CalendarStack = createStackNavigator<CalendarStackParamList>();

export default function CalendarContainer() {
  return (
    <CalendarStack.Navigator
      initialRouteName="CalendarScreen"
      screenOptions={{
        headerLeft: leftTitle,
        headerTitle: () => {
          return "";
        },
        headerRight: rightTitle,
        headerShadowVisible: false,
      }}
    >
      <CalendarStack.Screen name="CalendarScreen" component={CalendarMain} />
    </CalendarStack.Navigator>
  );
}
