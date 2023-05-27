
export interface Sender {
  id: number;
}

export interface Party {
  id:number;
}

export interface Message {
  id: number;
  content: string;
  sender: Sender;
  time_submitted: string;
  party: number;
}

