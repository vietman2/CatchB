import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type RootTabParamList = {
  Home: undefined;
  Nearby: undefined;
  Community: undefined;
  Calendar: undefined;
  MyPage: undefined;
  MyStore: undefined;
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

export type MyStoreStackParamList = {
  MyStoreScreen: undefined;
  WorkProgress: undefined;
};
export type MyStoreStackScreenProps<T extends keyof MyStoreStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MyStoreStackParamList, T>,
    RootTabScreenProps<"MyStore">
  >;

export type CommunityStackParamList = {
  CommunityScreen: undefined;
  AnotherScreen: undefined;
};
export type CommunityStackScreenProps<T extends keyof CommunityStackParamList> =
  CompositeScreenProps<
    StackScreenProps<CommunityStackParamList, T>,
    RootTabScreenProps<"Community">
  >;

export type CalendarStackParamList = {
  CalendarScreen: undefined;
};
export type CalendarStackScreenProps<T extends keyof CalendarStackParamList> =
  CompositeScreenProps<
    StackScreenProps<CalendarStackParamList, T>,
    RootTabScreenProps<"Calendar">
  >;

export type MyPageStackParamList = {
  MyPageScreen: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: undefined;
  EditProfile: { title: string, detail: string };
};
export type MyPageStackScreenProps<T extends keyof MyPageStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MyPageStackParamList, T>,
    RootTabScreenProps<"MyPage">
  >;
