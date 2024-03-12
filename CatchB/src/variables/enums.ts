export const CouponStatus = {
  ACTIVE: { value: "ACT", label: "사용 가능" },
  USED: { value: "USE", label: "사용 완료" },
  EXPIRED: { value: "EXP", label: "기한 만료" },
};

export const CouponType = {
  AMOUNT: { value: "AMNT", label: "금액 할인" },
  PERCENTAGE: { value: "PCNT", label: "비율 할인" },
  FREE: { value: "FREE", label: "무료" },
};

export const CouponIssuerType = {
  CATCH_B: { value: "CAT", label: "캐치비" },
  FACILITY: { value: "FAC", label: "시설" },
  COACH: { value: "COA", label: "코치" },
  NULL: { value: "NULL", label: "없음" },
};

export const RegisterRoute = {
  CATCHB: { value: 1, label: "캐치비" },
  KAKAO: { value: 2, label: "카카오" },
  NAVER: { value: 3, label: "네이버" },
};

export const ReservationStatus = {
  WAITING: { value: "WA", label: "대기" },
  CONFIRMED: { value: "CO", label: "확정" },
  CANCELLED: { value: "CA", label: "취소" },
  FINISHED: { value: "FI", label: "완료" },
};
