import { Reservation, ReservationProduct } from "../types/products";

export const reservationProducts: ReservationProduct[] = [
  {
    id: 1,
    title: "2시간 대관",
    description: "2시간 대관 상품입니다",
    price: 20000,
    facility: "캐치비 레슨장",
    hours: 2,
    minutes: 0,
  },
  {
    id: 2,
    title: "4시간 대관",
    description: "4시간 대관 상품입니다",
    price: 35000,
    facility: "캐치비 레슨장",
    hours: 4,
    minutes: 0,
  },
  {
    id: 3,
    title: "30분 대관",
    description: "역시 녹두는 최저가!",
    price: 2000,
    facility: "녹두빌 아카데미",
    hours: 0,
    minutes: 30,
  },
  {
    id: 4,
    title: "1시간 예약",
    description: "1시간 예약 상품입니다",
    price: 15000,
    facility: "서울대 야구장",
    hours: 1,
    minutes: 0,
  },
  {
    id: 5,
    title: "2시간 예약",
    description: "2시간 예약 상품입니다",
    price: 28000,
    facility: "서울대 야구장",
    hours: 1,
    minutes: 0,
  },
];

export const newReservations: Reservation[] = [
  {
    uuid: "reservation-uuid-1",
    product: reservationProducts[0],
    reserved_user: "user-uuid-1",
    lesson_session: "fake",
    start_datetime: "내일 14:00",
    end_datetime: "내일 16:00",
    status: "WAITING",
    created_at: "방금 전",
    confirmed_at: null,
  },
  {
    uuid: "reservation-uuid-2",
    product: reservationProducts[1],
    reserved_user: "user-uuid-2",
    lesson_session: null,
    start_datetime: "다음주 수요일 18:00",
    end_datetime: "다음주 수요일 22:00",
    status: "WAITING",
    created_at: "44분 전",
    confirmed_at: null,
  },
];

export const confirmedReservations: Reservation[] = [
  {
    uuid: "reservation-uuid-3",
    product: reservationProducts[0],
    reserved_user: "user-uuid-3",
    lesson_session: null,
    start_datetime: "오늘 17:30",
    end_datetime: "오늘 19:30",
    status: "CONFIRMED",
    created_at: "지난주 일요일",
    confirmed_at: "월요일",
  },
];

export const finishedReservations: Reservation[] = [
  {
    uuid: "reservation-uuid-4",
    product: reservationProducts[1],
    reserved_user: "user-uuid-4",
    lesson_session: null,
    start_datetime: "어제 14:00",
    end_datetime: "어제 18:00",
    status: "FINISHED",
    created_at: "지난주 월요일",
    confirmed_at: "지난주 화요일",
  },
];

export const cancelledReservations: Reservation[] = [];
