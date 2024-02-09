import { CoachType } from "../types/products";

export const sampleCoaches: CoachType[] = [
  {
    id: 1,
    coach_uuid: "1",
    coach_name: "이승엽",
    coach_phone_number: "010-1234-5678",
    academic_background: "고졸",
    baseball_career: "삼성 레전드",
    coaching_career: "현 두산 베어스 감독",
    working_area: "인천시",
    rating: 4.5,
    image: require("assets/images/LSY.jpg"),
  },
  {
    id: 2,
    coach_uuid: "2",
    coach_name: "이대호",
    coach_phone_number: "010-8765-4321",
    academic_background: "고졸",
    baseball_career: "롯데 레전드",
    coaching_career: "없음 ㅋ",
    working_area: "서울시",
    rating: 4.5,
    image: require("assets/images/LDH.jpg"),
  },
  {
    id: 3,
    coach_uuid: "3",
    coach_name: "홍승우",
    coach_phone_number: "010-1234-4321",
    academic_background: "서울대 체육교육과",
    baseball_career: "대학선수 출신",
    coaching_career: "없음 ㅋ",
    working_area: "인천 서구 청라",
    rating: 9.2,
    image: require("assets/images/HSW.jpg"),
  },
];
