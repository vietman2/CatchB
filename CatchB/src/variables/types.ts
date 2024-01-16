import {
  ReservationStatus,
  CouponIssuerType,
  CouponStatus,
  CouponType,
} from "./enums";

export type UserProfile = {
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  nickname: string;
  email: string;
  phone_number: string;
  date_joined: string;
  birth_date?: string;
  gender?: string;
  experience_tier: string;
  register_route: string;
  user_type: string;
  profile_image?: string;
  num_coupons: number;
  total_points: string;
};

type CouponStatusKey = keyof typeof CouponStatus;
type CouponTypeKey = keyof typeof CouponType;
type CouponIssuerTypeKey = keyof typeof CouponIssuerType;

export type CouponClass = {
  code: string;
  coupon_name: string;
  coupon_description: string;
  coupon_issuer_type: CouponIssuerTypeKey;
  coupon_issuer: string;

  issue_valid_days: number;
  use_valid_days: number;
  registered_at: string;

  max_count: number;
  current_count: number;

  coupon_type: CouponTypeKey;
  discount_value: number;
};

export type Coupon = {
  user: string;
  coupon_class: CouponClass;
  issued_at: string;
  status: CouponStatusKey;
  valid_until: string;
  used_at: string | null;
};

export type Points = {
  user_uuid: string;
  title: string;
  description: string;
  points: number;
  used_points: number;
  remaining_points: number;
  created_at: string;
  status: string;
  valid_until: string;
};

export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

export type ReservationProduct = {
  title: string;
  description: string;
  price: number;
  facility: string;
  hours: number;
  minutes: number;
};

type ReservationStatusKey = keyof typeof ReservationStatus;

export type Reservation = {
  uuid: string;
  product: ReservationProduct;
  reserved_user: string;
  lesson_session: string | null;
  start_datetime: string;
  end_datetime: string;
  status: ReservationStatusKey;
  created_at: string;
  confirmed_at: string | null;
};

export type DailySalesInfo = {
  date: string;
  totalSales: number;
  individualSales: {
    name: string;
    sales: number;
  }[];
};

export type FacilityType = {
  name: string;
  location: string;
  rating: number;
  bulletPoints?: string[];
  description: string;
};
