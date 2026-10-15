import type { ApiResponse, User } from "./post.types";

export interface UserProfile extends User {
  email: string;
  dateOfBirth: string; 
  gender: "male" | "female";
  cover: string; 
  bookmarks: string[]; 
  followers: string[]; 
  following: string[]; 
  bookmarksCount: number;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  id: string;
}

export type ProfileResponse = ApiResponse<{ user: UserProfile }>;
