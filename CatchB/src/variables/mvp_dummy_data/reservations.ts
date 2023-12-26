import { Reservation, ReservationProduct } from "../types";

export const reservationProducts: ReservationProduct[] = [
  {
    title: "테스트 상품 1: 2시간 예약",
    description: "테스트 상품 1 설명",
    price: 20000,
    facility: "테스트 시설 1",
    hours: 2,
    minutes: 0,
  },
  {
    title: "테스트 상품 2: 4시간 예약",
    description: "테스트 상품 2 설명",
    price: 35000,
    facility: "테스트 시설 1",
    hours: 4,
    minutes: 0,
  },
];

export const newReservations: Reservation[] = [
  {
    uuid: "reservation-uuid-1",
    product: reservationProducts[0],
    reserved_user: "user-uuid-1",
    lesson_session: null,
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
    start_datetime:  "오늘 17:30",
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
