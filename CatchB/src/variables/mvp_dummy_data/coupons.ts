import { CouponClass, Coupon } from "../types";

export const sampleCouponClasses: CouponClass[] = [
  {
    code: "samp-leco-upon-code",
    coupon_name: "샘플 쿠폰: 10% 할인",
    coupon_description: "어디서나 사용 가능한 10% 할인 쿠폰",
    coupon_issuer_type: "CATCH_B",
    coupon_issuer: "admin_uuid",

    issue_valid_days: 30,
    use_valid_days: 30,
    registered_at: "2024-01-01",

    max_count: 100,
    current_count: 100,

    coupon_type: "PERCENTAGE",
    discount_value: 10,
  },
  {
    code: "anot-herc-oupo-n123",
    coupon_name: "샘플 쿠폰: 5,000원 할인",
    coupon_description: "레슨 5,000원 할인 쿠폰",
    coupon_issuer_type: "CATCH_B",
    coupon_issuer: "admin_uuid",

    issue_valid_days: 30,
    use_valid_days: 30,
    registered_at: "2024-01-01",

    max_count: 100,
    current_count: 100,

    coupon_type: "AMOUNT",
    discount_value: 5000,
  },
];

export const sampleCoupons: Coupon[] = [
  {
    user: "user_uuid",
    coupon_class: sampleCouponClasses[0],
    issued_at: "2024-01-01",
    status: "ACTIVE",
    valid_until: "2024-02-01",
    used_at: null,
  },
  {
    user: "user_uuid",
    coupon_class: sampleCouponClasses[1],
    issued_at: "2024-01-01",
    status: "ACTIVE",
    valid_until: "2024-02-01",
    used_at: null,
  },
];
