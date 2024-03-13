export type PostType = {
  id: number;
  forum_id: number;
  forum_name: string;
  title: string;
  body: string;
  tags: string[];

  userId: number;
  author_name: string;
  created_at: string;
  updated_at: string;
  num_comments: number;
  num_likes: number;
  num_clicks: number;
};

export type ForumType = {
  name: string;
};

export type TagType = {
  id: number;
  name: string;
  icon: string;
  color: string;
  bgcolor: string;
};
