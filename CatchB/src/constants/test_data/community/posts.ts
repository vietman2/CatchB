import { sampleComments } from "./comments";
import { tag1 } from "./tags";
import { PostDetailType, PostSimpleType } from ".types/community";

export const samplePosts: PostDetailType[] = [
  {
    id: 1,
    author_nickname: "작성자",
    title: "test title",
    content: "test content",
    tags: [tag1],
    images: [],
    forum: "야구톡",
    created_at: new Date().toISOString(),
    updated_at: "2024-02-13T12:30:01.010Z",
    num_comments: 1,
    num_likes: 1,
    num_dislikes: 0,
    num_clicks: 1,
    is_liked: true,
    is_disliked: false,
  },
];

export const sampleSimplePosts: PostSimpleType[] = [
  {
    id: 1,
    author_nickname: "작성자",
    title: "test title",
    content: "test content",
    tags: [tag1],
    contains_images: false,
    created_at: "2024-02-01T12:00:01.010Z",
    num_comments: 1,
    num_likes: 1,
    num_dislikes: 0,
    num_clicks: 1,
  },
  {
    id: 2,
    author_nickname: "작성자",
    title: "long post",
    content: "long post content. the content is longer than 25 characters",
    tags: [tag1],
    contains_images: true,
    created_at: "2024-11-11T12:11:11.010Z",
    num_comments: 1,
    num_likes: 1,
    num_dislikes: 0,
    num_clicks: 1,
  },
  {
    id: 3,
    author_nickname: "작성자",
    title: "short post",
    content: "short post content",
    tags: [tag1],
    contains_images: false,
    created_at: new Date().toISOString(),
    num_comments: 1,
    num_likes: 1,
    num_dislikes: 0,
    num_clicks: 1,
  },
];
