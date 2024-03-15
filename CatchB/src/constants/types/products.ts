import { ImageRequireSource } from "react-native";

export type ReservationProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  facility: string;
  hours: number;
  minutes: number;
};

type ReservationStatusChoices = "WA" | "CO" | "CA" | "FI";

export type ReservationType = {
  uuid: string;
  product: ReservationProductType;
  reserved_user: string;
  lesson_session: string | null;
  start_datetime: string;
  end_datetime: string;
  status: ReservationStatusChoices;
  created_at: string;
  confirmed_at: string | null;
};

export type FacilityType = {
  id: number;
  name: string;
  location: string;
  rating: number;
  bulletPoints?: string[];
  description: string;
  position: {
    lat: number;
    lng: number;
  };
  products: ReservationProductType[];
  image: ImageRequireSource;
};

export type CoachType = {
  id: number;
  coach_uuid: string;
  coach_name: string;
  coach_phone_number: string;
  academic_background: string;
  baseball_career: string;
  coaching_career: string;
  description: string;
  working_area: string;
  rating: number;
  image: ImageRequireSource;

  facility?: FacilityType;
};

export type LessonProductType = {
  id: number;
  coach_uuid: string;
  title: string;
  description: string;
  price: number;
};

export type SidoType = {
  sido_code: string;
  sido_name: string;
  label: string;
};

export type SigunguType = {
  code: string;
  name: string;
  label: string;
};
