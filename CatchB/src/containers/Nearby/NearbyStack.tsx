import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import Nearby from "./Nearby";
import FacilityDetail from "./FacilityDetail/FacilityDetail";
import BackButton from "../../components/Buttons/BackButton";
import { NearbyStackParamList } from "../../variables/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const NearbyStack = createStackNavigator<NearbyStackParamList>();
type NearbyNavigationProp = StackNavigationProp<
  NearbyStackParamList,
  "NearbyScreen"
>;
interface NearbyProps {
  navigation: NearbyNavigationProp;
}

export default function NearbyContainer({ navigation }: NearbyProps) {
  const selectedFacility = useSelector(
    (store: RootState) => store.facility.selectedFacility
  );

  return (
    <NearbyStack.Navigator
      initialRouteName="NearbyScreen"
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <NearbyStack.Screen name="NearbyScreen" component={Nearby} />
      <NearbyStack.Screen
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
    </NearbyStack.Navigator>
  );
}
