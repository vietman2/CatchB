import { createStackNavigator } from "@react-navigation/stack";

import PromotionMain from "./Main/PromotionMain";
import { PromotionStackParamList } from "../../variables/navigation";

const PromotionStack = createStackNavigator<PromotionStackParamList>();

export default function PromotionContainer() {
  return (
    <PromotionStack.Navigator
      initialRouteName="PromotionScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <PromotionStack.Screen name="PromotionScreen" component={PromotionMain} />
    </PromotionStack.Navigator>
  );
}
