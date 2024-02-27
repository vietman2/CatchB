import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import NearbyMain from "./Main/NearbyMain";
import FacilityDetail from "./FacilityDetail/FacilityDetail";
import FacilityReserve from "./FacilityReserve/FacilityReserve";
import CoachDetail from "./CoachDetail/CoachDetail";
import Payment from "./Payment/Payment";
import { BackButton } from "../../components/Buttons";
import {
  NearbyStackParamList,
  NearbyStackScreenProps,
} from "../../variables/navigation";
import { RootState } from "../../store/store";

const NearbyNavStack = createStackNavigator<NearbyStackParamList>();

export default function NearbyStack() {
  const selectedFacility = useSelector(
    (store: RootState) => store.facility.selectedFacility
  );
  const selectedCoach = useSelector(
    (store: RootState) => store.coach.selectedCoach
  );
  const navigation =
    useNavigation<NearbyStackScreenProps<"NearbyScreen">["navigation"]>();

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
          headerTitle: selectedFacility?.name,
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
          headerTitle: `${selectedCoach?.coach_name} 코치`,
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
