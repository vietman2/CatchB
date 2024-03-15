import { createStackNavigator } from "@react-navigation/stack";

import PromotionMain from "./Main/PromotionMain";
import { PromotionParams } from ".constants/navigation";

const PromotionStack = createStackNavigator<PromotionParams>();

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
