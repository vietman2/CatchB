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

export const PointStatus = {
  ACTIVE: { value: "ACTIVE", label: "사용 가능" },
  PARTIAL: { value: "PARTIAL", label: "부분 사용" },
  USED: { value: "USED", label: "사용 완료" },
  EXPIRED: { value: "EXPIRED", label: "기한만료" },
};

export const UserType = {
  NORMAL: { value: "NORMAL", label: "일반" },
  ADMIN: { value: "ADMIN", label: "관리자" },
  COACH: { value: "COACH", label: "코치" },
  OWNER: { value: "OWNER", label: "시설주" },
};

export const ExperienceTier = {
  BEGINNER: { value: 0, label: "초보" },
  INTERMEDIATE: { value: 1, label: "중급" },
  ADVANCED: { value: 2, label: "고급" },
};

export const RegisterRoute = {
  CATCHB: { value: 1, label: "캐치비" },
  KAKAO: { value: 2, label: "카카오" },
  NAVER: { value: 3, label: "네이버" },
};

export const LessonStatus = {
  PENDING: { value: "PE", label: "대기" },
  CONFIRMED: { value: "CO", label: "확정" },
  CANCELLED: { value: "CA", label: "취소" },
  FINISHED: { value: "FI", label: "완료" },
};

export const Stars = {
  ONE: { value: 1, label: "1" },
  TWO: { value: 2, label: "2" },
  THREE: { value: 3, label: "3" },
  FOUR: { value: 4, label: "4" },
  FIVE: { value: 5, label: "5" },
};

export const PaymentStatus = {
  PENDING: { value: "PEN", label: "대기" },
  COMPLETED: { value: "COM", label: "완료" },
  CANCELLED: { value: "CAN", label: "취소" },
  FAILED: { value: "FAL", label: "실패" },
};

export const PaymentMethod = {
  CREDIT_CARD: { value: "CREDIT_CARD", label: "신용카드" },
  BANK_TRANSFER: { value: "BANK_TRANSFER", label: "계좌이체" },
  NAVER_PAY: { value: "NAVER_PAY", label: "네이버페이" },
  KAKAO_PAY: { value: "KAKAO_PAY", label: "카카오페이" },
  TOSS: { value: "TOSS", label: "토스" },
  PAYCO: { value: "PAYCO", label: "페이코" },
  SAMSUNG_PAY: { value: "SAMSUNG_PAY", label: "삼성페이" },
};

export const ForumCategory = {
  RECRUITMENT: { value: "RECR", label: "모집" },
  INFORMATION: { value: "INFO", label: "정보" },
  FREE: { value: "FREE", label: "자유" },
};

export const ReportReason = {
  AD: { value: "AD", label: "광고" },
  SPAM: { value: "SPAM", label: "스팸" },
  ADULT: { value: "ADULT", label: "성인물" },
  VIOLENCE: { value: "VIOLENCE", label: "폭력적인 내용" },
  ILLEGAL: { value: "ILLEGAL", label: "불법적인 내용" },
  OTHER: { value: "OTHER", label: "기타" },
};

export const ReservationStatus = {
  WAITING: { value: "WA", label: "대기" },
  CONFIRMED: { value: "CO", label: "확정" },
  CANCELLED: { value: "CA", label: "취소" },
  FINISHED: { value: "FI", label: "완료" },
};
