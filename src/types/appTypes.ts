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
  timelineItems: TimelineItem[];
  summary: string;
  places: Place[];
};

export type Place = {
  name: string;
  description: string;
};

export type Npc = {
  description?: string;
  location?: string;
  name: string;
  title: string;
};

export type Monster = {
  name: string;
};

export type TimelineItem = {
  title: string;
  description : string;
}

export type AbilityScore = {
  name: string;
  inde: string;
}

export type Skill = {
  name: string;
  inde: string;
}