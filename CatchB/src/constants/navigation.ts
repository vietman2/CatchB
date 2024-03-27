import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { PostDetailType } from "./types/community";
import { ReservationProductType } from ".types/products";
import { CouponType } from ".types/users";

export type RootParams = {
  Home: undefined;
  Nearby: undefined;
  Community: undefined;
  History: undefined;
  MyPage: undefined;
  MyStore: undefined;
  Promotion: undefined;
};
export type RootScreenProps<T extends keyof RootParams> = StackScreenProps<
  RootParams,
  T
>;

export type HomeParams = {
  SplashScreen: undefined;
};
export type HomeScreenProps<T extends keyof HomeParams> = CompositeScreenProps<
  StackScreenProps<HomeParams, T>,
  RootScreenProps<"Home">
>;

export type NearbyParams = {
  NearbyScreen: undefined;
  FacilityDetail: undefined;
  FacilityReserve: {
    selectedDate?: string;
    selectedTime?: string;
    selectedProduct?: ReservationProductType;
  };
  CoachDetail: undefined;
  Payment: undefined;
};

export type NearbyScreenProps<T extends keyof NearbyParams> =
  CompositeScreenProps<
    StackScreenProps<NearbyParams, T>,
    RootScreenProps<"Nearby">
  >;

export type MyStoreParams = {
  MyStoreScreen: undefined;
  WorkProgress: undefined;
};
export type MyStoreScreenProps<T extends keyof MyStoreParams> =
  CompositeScreenProps<
    StackScreenProps<MyStoreParams, T>,
    RootScreenProps<"MyStore">
  >;

export type CommunityParams = {
  CommunityScreen: undefined;
  PostCreate: undefined;
  PostDetail: undefined;
  PostReport: {
    post: PostDetailType;
  };
};
export type CommunityScreenProps<T extends keyof CommunityParams> =
  CompositeScreenProps<
    StackScreenProps<CommunityParams, T>,
    RootScreenProps<"Community">
  >;

export type HistoryParams = {
  HistoryScreen: undefined;
};
export type HistoryScreenProps<T extends keyof HistoryParams> =
  CompositeScreenProps<
    StackScreenProps<HistoryParams, T>,
    RootScreenProps<"History">
  >;

export type PromotionParams = {
  PromotionScreen: undefined;
};

export type MyPageParams = {
  MyPageScreen: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: undefined;
  EditProfile: { title: string; detail: string };
  CouponList: { coupons: CouponType[] };
  RegisterPro: { title: string; type: "coach" | "facility" };
  CouponRegister: undefined;
  Points: undefined;
  Payments: undefined;
  FAQ: undefined;
  Reviews: undefined;
  PasswordChange: undefined;
};
export type MyPageScreenProps<T extends keyof MyPageParams> =
  CompositeScreenProps<
    StackScreenProps<MyPageParams, T>,
    RootScreenProps<"MyPage">
  >;

export type CommentParams = {
  CommentList: undefined;
};

export type CommentScreenProps<T extends keyof CommentParams> =
  CompositeScreenProps<
    StackScreenProps<CommentParams, T>,
    CommunityScreenProps<"PostDetail">
  >;
