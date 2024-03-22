import { ImageRequireSource } from "react-native";

type ProviderImageType = {
  uri: string;
}

export type FacilitySimpleType = {
  uuid: string;
  name: string;
  region: string;
  profile: string;
  latitude: number;
  longitude: number;
};

type FacilityDetailType = {
  name: string;
  phone: string;
  owner_name: string;
  owner_phone: string;
  address: string;
  map_image: string;
}

export type FacilityInfoDetailType = {
  intro: string;
  facility: FacilityDetailType;
  images: ProviderImageType[];
  coaches: CoachProfileType[];
};

export type CoachSimpleType = {
  uuid: string;
  name: string;
  profile: string;
  regions: string;
  is_academy_coach: boolean;
}

export type CoachProfileType = {
  name: string;
  profile: string;
}

type CoachDetailType = {
  name: string;
  phone: string;
  facility: string | null;
  career: string;
}

export type CoachInfoDetailType = {
  intro: string;
  coach: CoachDetailType;
  images: ProviderImageType[];
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

export type RegionsType = {
  sido: SidoType[];
  sigungu: Record<string, SigunguType[]>;
};

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