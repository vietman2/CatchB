import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import NearbyMain from "./Main/NearbyMain";
import FacilityDetail from "./FacilityDetail/FacilityDetail";
import FacilityReserve from "./FacilityReserve/FacilityReserve";
import CoachDetail from "./CoachDetail/CoachDetail";
import Payment from "./Payment/Payment";
import { BackButton } from ".components/Buttons";
import { NearbyParams, NearbyScreenProps } from ".constants/navigation";

const NearbyNavStack = createStackNavigator<NearbyParams>();

export default function NearbyStack() {
  const navigation =
    useNavigation<NearbyScreenProps<"NearbyScreen">["navigation"]>();

  const goBackToNearbyScreen = () => {
    return <BackButton onPress={() => navigation.navigate("NearbyScreen")} />;
  };

  const goBackToFacilityDetail = () => {
    return <BackButton onPress={() => navigation.navigate("FacilityDetail")} />;
  };

  const goBackToFacilityReserve = () => {
    return (
      <BackButton onPress={() => navigation.navigate("FacilityReserve")} />
    );
  };

  return (
    <NearbyNavStack.Navigator
      initialRouteName="NearbyScreen"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <NearbyNavStack.Screen name="NearbyScreen" component={NearbyMain} />
      <NearbyNavStack.Screen
        name="FacilityDetail"
        component={FacilityDetail}
        options={{
          headerShown: true,
          headerLeft: goBackToNearbyScreen,
          headerBackTitleVisible: false,
        }}
      />
      <NearbyNavStack.Screen
        name="FacilityReserve"
        component={FacilityReserve}
        options={{
          headerShown: true,
          headerLeft: goBackToFacilityDetail,
          headerTitle: "예약하기",
          headerBackTitleVisible: false,
        }}
      />
      <NearbyNavStack.Screen
        name="CoachDetail"
        component={CoachDetail}
        options={{
          headerShown: true,
          headerLeft: goBackToNearbyScreen,
          headerBackTitleVisible: false,
        }}
      />
      <NearbyNavStack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: true,
          headerLeft: goBackToFacilityReserve,
          headerTitle: "결제하기",
          headerBackTitleVisible: false,
        }}
      />
    </NearbyNavStack.Navigator>
  );
}
