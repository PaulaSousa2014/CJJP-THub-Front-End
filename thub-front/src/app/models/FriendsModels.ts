export interface UserSender {
  id: number;
}

export interface UserReciever {
  id: number;
}

export interface FriendRequest {
  userSender: UserSender;
  userReciever: UserReciever;
}

export interface Accept {
  id: number;
  userSender: UserSender;
  userReciever: UserReciever;
  status: boolean;
}
