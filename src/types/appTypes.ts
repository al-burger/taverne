export interface Player {
  name: string;
  level: number;
  race: string;
  class: string;
}

export interface Campaign {
  name: string;
  players: Player[];
}
