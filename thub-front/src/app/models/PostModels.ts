export interface Creator {
  id: number;
}

export interface Post {
  content: string;
  creator: Creator;
  time_submitted: string;
}


