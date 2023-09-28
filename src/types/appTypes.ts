export interface Player {
  name: string;
  level: number;
  race: string;
  class: string;
}

export interface Campaign {
  name: string;
  players: Player[];
  game: string;
  uid: string;
}

export interface User {
  displayName: string | null,
  email: string | null,
  uid: string | null,
  isUserLogged: boolean,
}