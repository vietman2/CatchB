import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import NearbyMain from "./Main/NearbyMain";
import FacilityDetail from "./FacilityDetail/FacilityDetail";
import BackButton from "../../components/Buttons/BackButton";
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
  const navigation =
    useNavigation<NearbyStackScreenProps<"NearbyScreen">["navigation"]>();

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
          headerLeft: () => {
            return (
              <BackButton onPress={() => navigation.navigate("NearbyScreen")} />
            );
          },
          headerTitle: selectedFacility?.name,
          headerBackTitleVisible: false,
        }}
      />
    </NearbyNavStack.Navigator>
  );
}
