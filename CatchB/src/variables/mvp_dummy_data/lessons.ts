import { LessonProduct } from "../types/products";

export const sampleLessonProducts: LessonProduct[] = [
  {
    id: 1,
    coach_uuid: "1",
    title: "초등학생 1달 클래스",
    description: "캐치볼 레슨 상품입니다. 선착순 20명만 받습니다.",
    price: 20000,
  },
  {
    id: 2,
    coach_uuid: "3",
    title: "타격 레슨: 선수지망생",
    description:
      "고교, 대학야구 4할타자 홍승우의 타격레슨.\n결제하시기 전에 문의 부탁드립니다.",
    price: 35000,
  },
];
