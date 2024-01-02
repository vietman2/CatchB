import { ReservationStatus } from "./enums";

export type UserProfile = {
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_joined: string;
  birth_date?: string;
  gender?: string;
  experience_tier: string;
  register_route: string;
  user_type: string;
  profile_image?: string;
}

export type Todo = {
  id: number;
  title: string;
  done: boolean;
}

export type ReservationProduct = {
  title: string;
  description: string;
  price: number;
  facility: string;
  hours: number;
  minutes: number;
}

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

export type DailySalesInfo = {
  date: string;
  totalSales: number;
  individualSales: {
    name: string;
    sales: number;
  }[];
};
