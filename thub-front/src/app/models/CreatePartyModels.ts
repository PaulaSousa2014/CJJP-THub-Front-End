import { User } from "./UserModels";


export interface Game {
  id: number ;
}

export interface Activity {
  id: number ;
}
export interface Social {
  id: number ;
}
export interface Party{
  id: number;
  title: string;
  description: string;
  creator: User;
  game: Game | null;
  activity: Activity | null;
  social: Social | null;

}

export interface PartyMember{
  id:number;
  user: User;
  party: Party;
}


