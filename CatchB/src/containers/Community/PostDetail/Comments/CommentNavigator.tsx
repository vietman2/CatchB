import { useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";

import { CommentList } from "./CommentList";
import { CommentParams } from ".constants/navigation";

const Stack = createStackNavigator<CommentParams>();

export default function CommentNavigator() {
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
      safeAreaInsets: { top: 0, bottom: 0 },
    }),
    []
  );

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="CommentList"
          component={CommentList}
          options={{ headerShown: true, headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
