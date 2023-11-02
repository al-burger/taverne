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
  picture?: File | Blob;
  imageURL: string;
  scenarios: Scenario [];
  id: string;
}

export interface User {
  displayName: string | null,
  email: string | null,
  uid: string | null,
  isUserLogged: boolean,
}

export interface Scenario {
  name: string;
  steps: Step[];
}

export type Step = {
  name: string;
  npc: Npc[];
  monsters: Monster[];
  items: string[];
};

export type Npc = {
  name: string;
  title: string;
};

export type Monster = {
  name: string;
};