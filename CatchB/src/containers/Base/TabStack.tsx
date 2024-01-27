import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { requestForegroundPermissionsAsync } from "expo-location";

import HomeContainer from "../Home/HomeStack";
import NearbyContainer from "../Nearby/NearbyStack";
import CommunityContainer from "../Community/CommunityStack";
import CalendarContainer from "../Calendar/CalendarStack";
import MyPageContainer from "../MyPage/MyPageStack";
import MyStoreContainer from "../MyStore/MyStoreStack";
import SwitchModeDialog from "../../components/Dialogs/SwitchModeDialog";
import LoginDialog from "../../components/Dialogs/LoginDialog";
import {
  RootTabParamList,
  RootTabScreenProps,
} from "../../variables/navigation";
import { themeColors } from "../../variables/colors";
import { getUserProfile, renewToken } from "../../services/account";
import { setMode } from "../../store/slices/modeSlice";
import { AppDispatch, RootState } from "../../store/store";
import { get } from "../../store/secure";
import { setUserProfile, setNewToken } from "../../store/slices/authSlice";

/**
 * TabContainer
 * 하단 탭의 구성을 담당한다.
 */

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

export default function TabContainer() {
  const [switchModeVisible, setSwitchModeVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginTitle, setLoginTitle] = useState("");
  const [loginContents, setLoginContents] = useState("");
  const mode = useSelector((state: RootState) => state.mode.mode);
  const user = useSelector((state: RootState) => state.auth.user);
  const access = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootTabScreenProps<"Home">["navigation"]>();

  const getPermission = async () => {
    await requestForegroundPermissionsAsync();
  };

  useEffect(() => {
    getPermission();
    get("refresh_token").then(async (token) => {
      if (token) {
        const response = await renewToken(token);

        if (response.status === 200) {
          dispatch(setNewToken(response.data));
        } else {
          setLoginVisible(true);
          setLoginTitle("다시 로그인하기.");
          setLoginContents(
            "마지막 로그인 후 30일이 지났습니다. 다시 로그인해주세요."
          );
        }
      } else {
        // 토큰이 없다는 것은 둘중 하나
        // 1. 로그인을 한 적이 없다.
        // 2. 로그아웃을 했다.

        // TODO: 로그인을 한 적이 없으면 계정을 만들어보라고 알림 띄우기
        setLoginVisible(true);
        setLoginTitle("로그인이 필요합니다.");
        setLoginContents("더 많은 서비스를 이용하려면 로그인을 해주세요.");
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
          dispatch(setUserProfile(response.data));
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
      <SwitchModeDialog
        visible={switchModeVisible}
        currentMode={mode}
        user={user}
        onClose={onClose}
        setMode={navigate}
      />
      <LoginDialog
        visible={loginVisible}
        title={loginTitle}
        contents={loginContents}
        onClose={onClose}
      />
    </>
  );
}
