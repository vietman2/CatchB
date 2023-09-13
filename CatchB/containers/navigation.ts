import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { CoachInfoType, FacilityInfoType } from "../variables/types";

export type RootTabParamList = {
  Home: undefined;
  Nearby: undefined;
  Community: undefined;
  Calendar: undefined;
  MyPage: undefined;
  Login: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> =
  StackScreenProps<RootTabParamList, T>;

export type HomeStackParamList = {
  Login: undefined;
  SignUp: undefined;
  SplashScreen: undefined;
  CoachDetail: { coach: CoachInfoType };
  FacilityDetail: { facility: FacilityInfoType };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, T>,
    RootTabScreenProps<"Home">
  >;
