import { SidoType, SigunguType, RegionsType } from ".constants/types/products";

const sampleSido: SidoType[] = [
  {
    sido_code: "1100000000",
    sido_name: "서울특별시",
    label: "서울시",
  },
  {
    sido_code: "2100000000",
    sido_name: "부산광역시",
    label: "부산시",
  },
];

export const sampleSigungu: SigunguType[] = [
  {
    code: "1100000000",
    name: "종로구",
    label: "종로구",
  },
  {
    code: "1110000000",
    name: "중구",
    label: "중구",
  },
];

export const sampleRegions: RegionsType = {
  sido: sampleSido,
  sigungu: {
    "1100000000": sampleSigungu,
  },
};
