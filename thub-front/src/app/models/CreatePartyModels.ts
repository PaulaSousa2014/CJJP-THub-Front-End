export interface Creator {
  id: number;
}

export interface Game {
  id: number;
}

export interface Social {
  id: number;
}

export interface Activity {
  id: number;
}
export interface Party{
  partyType: any;

  title: string;
  description: string;
  creator: Creator;
  activity: Activity | null;
  game: Game | null;
  social:Social | null;
}


/*{
        "title": "Sarah's Graduation Party",
        "description": "Celebrate Sarah's graduation from college",
        "creator": {
            "id": 3
        },
        "activity": null,
        "game": null,
        "social": {
            "id": 1
        }
    }*/
