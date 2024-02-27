import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { TourGuideZone } from "rn-tourguide";

import {
  CommunityContainer,
  HistoryContainer,
  MyPageContainer,
  MyStoreContainer,
  NearbyContainer,
  NormalContainer,
  ProContainer,
  PromotionContainer,
} from "../";
import { SwitchModeDialog, LoginDialog } from "../../components/Dialogs";
import {
  RootTabParamList,
  RootTabScreenProps,
} from "../../variables/navigation";
import { themeColors } from "../../variables/colors";
import {
  getUserProfile,
  renewToken,
} from "../../services/user_management/account";
import { setMode, setLocation } from "../../store/slices/general/generalSlice";
import {
  setUserProfile,
  setNewToken,
} from "../../store/slices/user_management/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { get } from "../../store/secure";
/**
 * TabContainer
 * 하단 탭의 구성을 담당한다.
 */

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

export default function TabContainer() {
  const [switchModeVisible, setSwitchModeVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const mode = useSelector((state: RootState) => state.general.mode);
  const user = useSelector((state: RootState) => state.auth.user);
  const access = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootTabScreenProps<"Home">["navigation"]>();

  const getPermission = async () => {
    await requestForegroundPermissionsAsync();

    const location = await getCurrentPositionAsync();
    if (location) {
      dispatch(setLocation(location));
    }
  };

  useEffect(() => {
    getPermission();
    get("refresh_token").then(async (token) => {
      if (token) {
        const response = await renewToken(token);

        if (response.status === 200) {
          await dispatch(setNewToken(response.data));
        } else {
          setLoginVisible(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!access) {
      return;
    }
    get("uuid").then(async (uuid) => {
      if (uuid) {
        const response = await getUserProfile(uuid, access);

        if (response.status === 200) {
          await dispatch(setUserProfile(response.data));
        }
      }
    });
  }, [access]);

  const handleLongPress = () => {
    setSwitchModeVisible(true);
  };

  const navigate = (screen: "basic" | "pro") => {
    setSwitchModeVisible(false);
    dispatch(setMode(screen));
    navigation.navigate("Home");
  };

  const onClose = () => {
    setSwitchModeVisible(false);
    setLoginVisible(false);
  };

  function HomeContainer() {
    if (mode === "basic") {
      return <NormalContainer />;
    } else {
      return <ProContainer />;
    }
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={{
          backgroundColor: themeColors.primaryContainer,
          marginBottom: -15,
        }}
        activeColor={themeColors.primary}
        shifting
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
            component={NearbyContainer}
            options={{
              tabBarLabel: "내 주변",
              tabBarIcon: ({ color }) => (
                <TourGuideZone zone={3} text="내 주변 탭입니다.">
                  <MaterialCommunityIcons
                    name="map-marker"
                    color={color}
                    size={26}
                  />
                </TourGuideZone>
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
        {mode === "basic" ? (
          <Tab.Screen
            name="History"
            component={HistoryContainer}
            options={{
              tabBarLabel: "이용내역",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="receipt"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="Promotion"
            component={PromotionContainer}
            options={{
              tabBarLabel: "프로모션",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="gift" color={color} size={26} />
              ),
            }}
          />
        )}
        <Tab.Screen
          name="MyPage"
          component={MyPageContainer}
          options={{
            tabBarLabel: "마이페이지",
            tabBarIcon: ({ color }) => (
              <TourGuideZone
                zone={4}
                text="마이페이지 탭을 꾹 누르면 프로모드로 전환할 수 있습니다."
              >
                <MaterialCommunityIcons
                  name="account-box"
                  color={color}
                  size={26}
                  testID="MyPageIcon"
                />
              </TourGuideZone>
            ),
          }}
          listeners={{
            tabLongPress: handleLongPress,
          }}
        />
      </Tab.Navigator>
      <SwitchModeDialog
        visible={switchModeVisible}
        currentMode={mode}
        user={user}
        onClose={onClose}
        setMode={navigate}
      />
      <LoginDialog visible={loginVisible} onClose={onClose} />
    </>
  );
}
