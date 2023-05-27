export interface Post {
  id: number;
}
export interface User {
  id: number;
}

export interface Comment{
  content: string,
  comment_by: User,
  in_post: Post,
}
