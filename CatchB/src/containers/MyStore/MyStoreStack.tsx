import { createStackNavigator } from "@react-navigation/stack";

import MyStoreMain from "./Main/MyStoreMain";
import WorkProgress from "./WorkProgress/WorkProgress";
import { SmallLogo } from ".components/Logos";
import { MyStoreParams } from ".constants/navigation";

const MyStoreStack = createStackNavigator<MyStoreParams>();

export default function MyStoreContainer() {
  return (
    <MyStoreStack.Navigator
      initialRouteName="MyStoreScreen"
      screenOptions={{
        headerLeft: SmallLogo,
        headerTitle: () => {
          return "";
        },
        headerRight: null,
        headerShadowVisible: false,
      }}
    >
      <MyStoreStack.Screen name="MyStoreScreen" component={MyStoreMain} />
      <MyStoreStack.Screen name="WorkProgress" component={WorkProgress} />
    </MyStoreStack.Navigator>
  );
}
