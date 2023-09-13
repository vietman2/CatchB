export type CoachInfoType = {
  id: number;
  name: string;
  rating: number;
  price: number;
  location: string;
  num_reviews: number;
  likes?: number;
  chat_url?: string;
  career?: string[];
  response_rate?: number;
  consults?: number;
};

export type FacilityInfoType = {
  id: number;
  name: string;
  address: string;
  rating?: number;
  price?: number;
  num_reviews?: number;
  likes?: number;
  chat_url?: string;
  description?: string[];
  response_rate?: number;
  consults?: number;
};

export type InformationType = {
  id: number;
  title: string;
  hashtags: string[];
  provider: string;
  date: string;
};
