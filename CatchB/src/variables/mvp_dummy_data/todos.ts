import { Todo } from "../types";

export const openTodos: Todo[] = [
  {
    id: 1,
    title: "매장 내부 - 재고관리",
    done: true,
  },
  {
    id: 2,
    title: "매장 내부 - 최종 세팅",
    done: true,
  },
  {
    id: 3,
    title: "매장 외부 - 쓰레기 줍기",
    done: true,
  },
  {
    id: 4,
    title: "데스크 점검",
    done: false,
  },
];

export const middleTodos: Todo[] = [
  {
    id: 1,
    title: "매장 내부 - 물건 정리",
    done: true,
  },
  {
    id: 2,
    title: "매장 내부 - 쓰레기 줍기",
    done: true,
  },
  {
    id: 3,
    title: "매장 외부 - 소독",
    done: false,
  },
  {
    id: 4,
    title: "데스크 점검",
    done: false,
  },
];

export const closeTodos: Todo[] = [
  {
    id: 1,
    title: "매장 내부 - 물건 청소",
    done: true,
  },
  {
    id: 2,
    title: "매장 내부 - 데스크 정리",
    done: false,
  },
  {
    id: 3,
    title: "매장 외부 - 마감",
    done: false,
  },
  {
    id: 4,
    title: "데스크 정리",
    done: false,
  },
];
