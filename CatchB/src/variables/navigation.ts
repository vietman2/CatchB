import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { Coupon } from "./types";
import { ReservationProduct } from "./types/products";

export type RootTabParamList = {
  Home: undefined;
  Nearby: undefined;
  Community: undefined;
  History: undefined;
  MyPage: undefined;
  MyStore: undefined;
  Promotion: undefined;
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

export type NearbyStackParamList = {
  NearbyScreen: undefined;
  FacilityDetail: undefined;
  FacilityReserve: {
    selectedDate?: string;
    selectedTime?: string;
    selectedProduct?: ReservationProduct;
  };
  CoachDetail: undefined;
  Payment: undefined;
};

export type NearbyStackScreenProps<T extends keyof NearbyStackParamList> =
  CompositeScreenProps<
    StackScreenProps<NearbyStackParamList, T>,
    RootTabScreenProps<"Nearby">
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
  PostCreate: undefined;
  PostDetail: undefined;
};
export type CommunityStackScreenProps<T extends keyof CommunityStackParamList> =
  CompositeScreenProps<
    StackScreenProps<CommunityStackParamList, T>,
    RootTabScreenProps<"Community">
  >;

export type HistoryStackParamList = {
  HistoryScreen: undefined;
};
export type HistoryStackScreenProps<T extends keyof HistoryStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HistoryStackParamList, T>,
    RootTabScreenProps<"History">
  >;

export type PromotionStackParamList = {
  PromotionScreen: undefined;
};
export type PromotionStackScreenProps<T extends keyof PromotionStackParamList> =
  CompositeScreenProps<
    StackScreenProps<PromotionStackParamList, T>,
    RootTabScreenProps<"Promotion">
  >;

export type MyPageStackParamList = {
  MyPageScreen: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: undefined;
  EditProfile: { title: string; detail: string };
  CouponList: { coupons: Coupon[] };
  CouponRegister: undefined;
  Points: undefined;
  CoachRegister: undefined;
  FacilityRegister: undefined;
  Payments: undefined;
  FAQ: undefined;
  Reviews: undefined;
  PasswordChange: undefined;
};
export type MyPageStackScreenProps<T extends keyof MyPageStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MyPageStackParamList, T>,
    RootTabScreenProps<"MyPage">
  >;
