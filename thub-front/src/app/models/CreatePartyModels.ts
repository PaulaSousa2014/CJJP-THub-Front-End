export interface Creator {
  id: number;
}

export interface Game {
  id: number;
}


export interface Party{

  title: string;
  description: string;
  creator: Creator;
  game: Game;
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
