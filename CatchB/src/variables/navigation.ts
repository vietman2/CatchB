import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type RootTabParamList = {
  Home: undefined;
  Nearby: undefined;
  Community: undefined;
  Calendar: undefined;
  MyPage: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> =
  StackScreenProps<RootTabParamList, T>;

export type HomeStackParamList = {
  SplashScreen: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, T>,
    RootTabScreenProps<"Home">
  >;

export type MyPageStackParamList = {
  MyPageScreen: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type MyPageStackScreenProps<T extends keyof MyPageStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MyPageStackParamList, T>,
    RootTabScreenProps<"MyPage">
  >;
