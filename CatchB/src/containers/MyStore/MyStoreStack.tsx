import { createStackNavigator } from "@react-navigation/stack";

import MyStoreMain from "./Main/MyStoreMain";
import WorkProgress from "./WorkProgress/WorkProgress";
import { leftTitle, rightTitle } from "../../components/Logos/TopBar";
import { MyStoreStackParamList } from "../../variables/navigation";

const MyStoreStack = createStackNavigator<MyStoreStackParamList>();

export default function MyStoreContainer() {
  return (
    <MyStoreStack.Navigator
      initialRouteName="MyStoreScreen"
      screenOptions={{
        headerLeft: leftTitle,
        headerTitle: () => {
          return "";
        },
        headerRight: rightTitle,
        headerShadowVisible: false,
      }}
    >
      <MyStoreStack.Screen name="MyStoreScreen" component={MyStoreMain} />
      <MyStoreStack.Screen name="WorkProgress" component={WorkProgress} />
    </MyStoreStack.Navigator>
  );
}
