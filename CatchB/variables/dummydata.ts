import { CoachInfoType, FacilityInfoType, InformationType } from "./types"

const coaches: CoachInfoType[] = [
    {
        id: 1,
        name: "이승엽",
        rating: 10.0,
        price: 50000,
        location: "서울시 강남구",
        num_reviews: 10,
    },
    {
        id: 2,
        name: "박찬호",
        rating: 9.5,
        price: 80000,
        location: "서울시 관악구",
        num_reviews: 17,
    },
    {
        id: 3,
        name: "이대호",
        rating: 9.0,
        price: 60000,
        location: "부산시 해운대구",
        num_reviews: 5,
    },
    {
        id: 4,
        name: "홍승우",
        rating: 8.5,
        price: 40000,
        location: "서울시 관악구",
        num_reviews: 13,
    }
]

const facilities: FacilityInfoType[] = [
    {
        id: 1,
        name: "원스타베이스볼 아카데미",
        address: "경기 고양시 일산서구 가좌로 62",
    },
    {
        id: 2,
        name: "분당 빠따형 야구레슨",
        address: "경기 성남시 분당구 판교역로 235",
    },
    {
        id: 3,
        name: "스윕 베이스볼 아카데미",
        address: "서울 강남구 논현로 508",
    },
    {
        id: 4,
        name: "시흥 엘리트 야구 레슨",
        address: "경기 시흥시 정왕동 182-1",
    }
]

const informations: InformationType[] = [
    {
        id: 1,
        title: "첫 사회인 야구 시합이라면 필독!",
        hashtags: ["글러브", "스파이크", "야구룰"],
        provider: "캐치비",
        date: "2023-08-21",
    },
    {
        id: 2,
        title: "내가 야구를 더 잘하기 위한 방법",
        hashtags: ["야구배트", "슬라이딩", "발사각"],
        provider: "캐치비",
        date: "2023-08-21",
    }
]

export { coaches, facilities, informations }
