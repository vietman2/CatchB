import { FacilityType } from ".types/products";
import { reservationProducts } from "./reservations";

export const sampleFacilities: FacilityType[] = [
  {
    id: 1,
    name: "서울대 야구장",
    location: "서울시 관악구 대학동",
    rating: 4.5,
    bulletPoints: ["불규칙 대비 ㅆㄱㄴ", "레슨 프로그램 없음"],
    description: "서울대학교 내에 위치한 야구장입니다.",
    position: {
      lat: 37.467219,
      lng: 126.951036,
    },
    image: require("assets/images/facility1.png"),
    products: [reservationProducts[3], reservationProducts[4]],
  },
  {
    id: 2,
    name: "녹두빌 아카데미",
    location: "서울시 관악구 대학동",
    rating: 10,
    bulletPoints: [
      "200평 규모 시설 완비 레슨장",
      "최신식 트레이너 및 레슨 프로그램",
      "프로 출신 코치진",
    ],
    description:
      "서울시 관악구 최고의 실내 야구레슨장 Catch B 입니다.\n큰 규모와 완벽한 시설을 갖추고 있습니다.\n프로출신 코치진들과 함께 야구 실력을 올려보세요!\n언제든 편하게 상담 주시면 감사하겠습니다!",
    position: {
      lat: 37.46969,
      lng: 126.938306,
    },
    image: require("assets/images/facility2.jpg"),
    products: [reservationProducts[2]],
  },
  {
    id: 3,
    name: "캐치비 레슨장",
    location: "인천시 서구 청라동",
    rating: 10,
    bulletPoints: ["홍승우 완비"],
    description: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
    position: {
      lat: 37.531995,
      lng: 126.629474,
    },
    image: require("assets/images/facility3.jpg"),
    products: [reservationProducts[0], reservationProducts[1]],
  },
];
