export type TagType = {
  id: number;
  name: string;
  icon: string;
  color: string;
  bgcolor: string;
};

export type PostSimpleType = {
  id: number;
  author_nickname: string;
  title: string;
  content: string;
  tags: TagType[];
  contains_images: boolean;
  num_clicks: number;
  num_comments: number;
  num_likes: number;
  num_dislikes: number;
  created_at: string;
};

export type PostDetailType = {
  id: number;
  forum: string;
  author_nickname: string;
  title: string;
  content: string;

  tags: TagType[];
  images: string[];
  comments: CommentSimpleType[];

  num_comments: number;
  num_clicks: number;
  num_likes: number;
  num_dislikes: number;

  is_liked: boolean;
  is_disliked: boolean;

  created_at: string;
  updated_at: string;
};

export type CommentSimpleType = {
  id: number;
  commenter_nickname: string;
  content: string;
  created_at: string;
  num_likes: number;
  num_recomments: number;
};
