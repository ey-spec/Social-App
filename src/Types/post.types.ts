export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Comment {
  _id: string;
  content: string;
  image?: string;
  commentCreator: User;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}

interface PostBase {
  _id: string;
  id: string;
  body?: string;
  image?: string;
  privacy: "public" | "private" | "followers";
  user: User;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  topComment: Comment | null;
  isShare: boolean;
  createdAt: string;
}

export interface SharedPost extends PostBase {
  sharedPost: null;
}

export interface Post extends PostBase {
  sharedPost: SharedPost | null;
  bookmarked: boolean;
}

export interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number | null;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { pagination: Pagination };
}

export type PostsResponse = ApiResponse<{ posts: Post[] }>;

export type CommentsResponse = ApiResponse<{ comments: Comment[] }>;

export type SinglePostResponse = ApiResponse<{ post: Post }>;
