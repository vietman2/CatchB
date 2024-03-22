import { FacilitySimpleType, FacilityInfoDetailType } from ".types/products";

export const sampleFacilities: FacilitySimpleType[] = [
  {
    uuid: "1",
    name: "서울대 야구장",
    region: "서울시 관악구",
    latitude: 37.467219,
    longitude: 126.951036,
    profile: "assets/images/facility1.png",
  },
  {
    uuid: "2",
    name: "녹두빌 아카데미",
    region: "서울시 관악구",
    latitude: 37.467219,
    longitude: 126.951036,
    profile: "assets/images/facility2.jpg",
  },
  {
    uuid: "3",
    name: "캐치비 레슨장",
    region: "인천시 서구",
    latitude: 37.467219,
    longitude: 126.951036,
    profile: "assets/images/facility3.jpg",
  },
];

export const sampleFacilityDetail: FacilityInfoDetailType = {
  intro: "intro",
  facility: {
    name: "서울대 야구장",
    phone: "010-1234-5678",
    owner_name: "홍길동",
    owner_phone: "010-1234-5678",
    address: "서울시 관악구",
    map_image: "assets/images/facility1.png",
  },
  images: [
    {
      uri: "assets/images/facility1.png",
    },
    {
      uri: "assets/images/facility2.jpg",
    },
  ],
  coaches: [
    {
      name: "홍길동",
      profile: "assets/images/coach1.jpg",
    },
    {
      name: "김철수",
      profile: "assets/images/coach2.jpg",
    },
  ],
};
