import { Points } from "../types";

export const samplePoints: Points[] = [
  {
    user_uuid: "user_uuid",
    title: "샘플 포인트",
    description: "샘플 포인트입니다.",
    points: 10000,
    used_points: 0,
    remaining_points: 10000,
    created_at: "2024-01-01",
    status: "ACTIVE",
    valid_until: "2024-02-01",
  },
  {
    user_uuid: "user_uuid",
    title: "샘플 포인트2",
    description: "샘플 포인트2입니다.",
    points: 15000,
    used_points: 0,
    remaining_points: 10000,
    created_at: "2024-01-01",
    status: "ACTIVE",
    valid_until: "2024-02-01",
  },
];
