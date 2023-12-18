import { createStackNavigator } from "@react-navigation/stack";

import MyStore from "./MyStore";
import WorkProgress from "../../containers/mystore/WorkProgress";

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
      <MyStoreStack.Screen name="MyStoreScreen" component={MyStore} />
      <MyStoreStack.Screen name="WorkProgress" component={WorkProgress} />
    </MyStoreStack.Navigator>
  );
}
