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

  num_comments: number;
  num_clicks: number;
  num_likes: number;

  created_at: string;
  updated_at: string;
};
