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
};

export type FacilityInfoType = {
  id: number;
  name: string;
  address: string;
};

export type InformationType = {
  id: number;
  title: string;
  hashtags: string[];
  provider: string;
  date: string;
};
