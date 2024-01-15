import { useSelector } from "react-redux";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import Nearby from "./Nearby";
import FacilityDetail from "./FacilityDetail/FacilityDetail";
import BackButton from "../../components/Buttons/BackButton";
import { NearbyStackParamList } from "../../variables/navigation";
import { RootState } from "../../store/store";

const NearbyNavStack = createStackNavigator<NearbyStackParamList>();
type NearbyNavigationProp = StackNavigationProp<
  NearbyStackParamList,
  "NearbyScreen"
>;
interface NearbyProps {
  navigation: NearbyNavigationProp;
}

export default function NearbyStack({ navigation }: NearbyProps) {
  const selectedFacility = useSelector(
    (store: RootState) => store.facility.selectedFacility
  );

  return (
    <NearbyNavStack.Navigator
      initialRouteName="NearbyScreen"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <NearbyNavStack.Screen name="NearbyScreen" component={Nearby} />
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
