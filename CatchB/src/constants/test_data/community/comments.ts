import { CommentSimpleType } from ".constants/types/community";

export const sampleComments: CommentSimpleType[] = [
  {
    id: 1,
    commenter_nickname: "작성자",
    content: "test content",
    created_at: "2024-02-01T12:00:01.010Z",
    num_likes: 1,
    num_recomments: 1,
  },
  {
    id: 2,
    commenter_nickname: "작성자",
    content: "long post content. the content is longer than 25 characters",
    created_at: "2024-11-11T12:11:11.010Z",
    num_likes: 1,
    num_recomments: 1,
  },
  {
    id: 3,
    commenter_nickname: "작성자",
    content: "short post content",
    created_at: new Date().toISOString(),
    num_likes: 1,
    num_recomments: 1,
  },
];
