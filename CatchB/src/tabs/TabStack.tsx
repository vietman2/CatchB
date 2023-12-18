import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import HomeContainer from "./Home/HomeStack";
import NearbyScreen from "./Nearby/Nearby";
import CommunityContainer from "./Community/CommunityStack";
import CalendarContainer from "./Calendar/CalendarStack";
import MyPageContainer from "./MyPage/MyPageStack";
import MyStoreContainer from "./MyStore/MyStoreStack";
import { RootTabParamList } from "../variables/navigation";
import { themeColors } from "../variables/colors";
import { setMode } from "../store/slices/modeSlice";
import { RootState } from "../store/store";

/**
 * TabContainer
 * 하단 탭의 구성을 담당한다.
 */

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

export default function TabContainer() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch();

  const handleLongPress = () => {
    if (mode === "basic") {
      dispatch(setMode("pro"));
    } else {
      dispatch(setMode("basic"));
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{
        backgroundColor: themeColors.primaryContainer,
        marginBottom: -15,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      {mode === "basic" ? (
        <Tab.Screen
          name="Nearby"
          component={NearbyScreen}
          options={{
            tabBarLabel: "내 주변",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="map-marker"
                color={color}
                size={26}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="MyStore"
          component={MyStoreContainer}
          options={{
            tabBarLabel: "우리가게",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="store" color={color} size={26} />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Community"
        component={CommunityContainer}
        options={{
          tabBarLabel: "함께하기",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarContainer}
        options={{
          tabBarLabel: "캘린더",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-check"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageContainer}
        options={{
          tabBarLabel: "마이페이지",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-box"
              color={color}
              size={26}
              testID="MyPageIcon"
            />
          ),
        }}
        listeners={{
          tabLongPress: handleLongPress,
        }}
      />
    </Tab.Navigator>
  );
}
