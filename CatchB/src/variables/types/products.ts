import { ReservationStatus } from '../enums';

export type ReservationProduct = {
  title: string;
  description: string;
  price: number;
  facility: string;
  hours: number;
  minutes: number;
};

type ReservationStatusKey = keyof typeof ReservationStatus;

export type Reservation = {
  uuid: string;
  product: ReservationProduct;
  reserved_user: string;
  lesson_session: string | null;
  start_datetime: string;
  end_datetime: string;
  status: ReservationStatusKey;
  created_at: string;
  confirmed_at: string | null;
};

export type FacilityType = {
  name: string;
  location: string;
  rating: number;
  bulletPoints?: string[];
  description: string;
  position: {
    lat: number;
    lng: number;
  };
  products: ReservationProduct[];
};

export type CoachType = {
  coach_uuid: string;
  coach_name: string;
  coach_phone_number: string;
  academic_background: string;
  baseball_career: string;
  coaching_career: string;
  working_area: string;
  rating: number;

  facility?: FacilityType;
}