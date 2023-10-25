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
}

export interface User {
  displayName: string | null,
  email: string | null,
  uid: string | null,
  isUserLogged: boolean,
}

export interface ScenarioStep {
  name: string;
  pnj: { name: string }[];
  monsters: any[];
  items: any[]
}

export interface Scenario {
  name: string;
  steps: ScenarioStep[];
}