import { User } from "./UserModels";

export interface Creator {
  id: number;
}

export interface Post {
  id: number;
  content: string;
  creator: Creator;
  time_submitted: string;
}

export interface Like {
  id: number;
  user_liked: User;
  post_liked: Post;
}

