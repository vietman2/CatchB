import { CouponIssuerType, CouponStatus } from "../enums";

export type UserProfileType = {
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
  role: string;
  profile_image?: string;
  num_coupons: number;
  total_points: string;
};

type CouponStatusKey = keyof typeof CouponStatus;
type CouponIssuerTypeKey = keyof typeof CouponIssuerType;

export type CouponClassType = {
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

  coupon_type: "AMNT" | "PCNT" | "FREE";
  discount_value: number;
};

export type CouponType = {
  id: number;
  user: string;
  coupon_class: CouponClassType;
  issued_at: string;
  status: CouponStatusKey;
  valid_until: string;
  used_at: string | null;
};

export type PointsType = {
  id: number;
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
