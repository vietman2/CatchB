import { CoachSimpleType, CoachInfoDetailType } from ".types/products";

export const sampleCoaches: CoachSimpleType[] = [
  {
    uuid: "1",
    name: "이승엽",
    profile: "이승엽.jpg",
    regions: "서울특별시 강남구",
    is_academy_coach: true,
  },
  {
    uuid: "2",
    name: "이대호",
    profile: "이대호.jpg",
    regions: "서울특별시 강동구",
    is_academy_coach: false,
  },
  {
    uuid: "3",
    name: "홍승우",
    profile: "홍승우.jpg",
    regions: "서울특별시 송파구",
    is_academy_coach: true,
  },
];

export const sampleCoachInfos: CoachInfoDetailType[] = [
  {
    intro: "안녕하세요. 이승엽입니다.",
    coach: {
      name: "이승엽",
      phone: "010-1234-5678",
      facility: "서울특별시 강남구",
      career: "프로야구 선수",
    },
    images: [
      { uri: "이승엽1.jpg" },
      { uri: "이승엽2.jpg" },
      { uri: "이승엽3.jpg" },
    ],
  },
  {
    intro:
      "안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다. 안녕하세요. 이대호입니다.",
    coach: {
      name: "이대호",
      phone: "010-1234-5678",
      facility: "서울특별시 강동구",
      career: "프로야구 선수",
    },
    images: [
      { uri: "이대호1.jpg" },
      { uri: "이대호2.jpg" },
      { uri: "이대호3.jpg" },
    ],
  },
];
