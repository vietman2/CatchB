import { UserProfileType } from ".types/users";

export const admin: UserProfileType = {
  uuid: "admin_uuid",
  username: "admin",
  first_name: "리자",
  last_name: "관",
  full_name: "관리자",
  nickname: "관리자",
  email: "admin@admin.com",
  phone_number: "01012344321",
  date_joined: "2023-09-01",
  experience_tier: "UNDEFINED",
  register_route: "UNDEFINED",
  role: "F",
  num_coupons: 0,
  total_points: "0",
};

export const exampleUser: UserProfileType = {
  uuid: "user_uuid",
  username: "user",
  first_name: "길동",
  last_name: "홍",
  full_name: "홍길동",
  nickname: "홍길동",
  email: "example@user.co.kr",
  phone_number: "01056788765",
  date_joined: "2021-10-01",
  experience_tier: "UNDEFINED",
  register_route: "UNDEFINED",
  role: "N",
  num_coupons: 0,
  total_points: "0",
};
