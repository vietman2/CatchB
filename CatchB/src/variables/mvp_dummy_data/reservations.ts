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

export const reservations: Reservation[] = [
    {
        uuid: "reservation-uuid-1",
        product: reservationProducts[0],
        reserved_user: "user-uuid-1",
        lesson_session: null,
        start_datetime: "2021-07-01T12:00:00+09:00",
        end_datetime: "2021-07-01T14:00:00+09:00",
        status: "WAITING",
        created_at: "2021-06-30T12:00:00+09:00",
        confirmed_at: null,
    },
    {
        uuid: "reservation-uuid-2",
        product: reservationProducts[1],
        reserved_user: "user-uuid-2",
        lesson_session: null,
        start_datetime: "2021-07-01T14:00:00+09:00",
        end_datetime: "2021-07-01T18:00:00+09:00",
        status: "WAITING",
        created_at: "2021-06-30T12:00:00+09:00",
        confirmed_at: null,
    },
    {
        uuid: "reservation-uuid-3",
        product: reservationProducts[0],
        reserved_user: "user-uuid-3",
        lesson_session: null,
        start_datetime: "2021-07-01T18:00:00+09:00",
        end_datetime: "2021-07-01T20:00:00+09:00",
        status: "CONFIRMED",
        created_at: "2021-06-30T12:00:00+09:00",
        confirmed_at: "2021-06-30T12:00:00+09:00",
    },
    {
        uuid: "reservation-uuid-4",
        product: reservationProducts[1],
        reserved_user: "user-uuid-4",
        lesson_session: null,
        start_datetime: "2021-07-01T20:00:00+09:00",
        end_datetime: "2021-07-02T00:00:00+09:00",
        status: "FINISHED",
        created_at: "2021-06-30T12:00:00+09:00",
        confirmed_at: "2021-06-30T12:00:00+09:00",
    }
];