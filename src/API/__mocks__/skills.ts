export const skillsResults = {
  results: [
    {
      index: "acrobatics",
      name: "Acrobatics",
      url: "/api/skills/acrobatics",
    },
    {
      index: "animal-handling",
      name: "Animal Handling",
      url: "/api/skills/animal-handling",
    },
    { index: "arcana", name: "Arcana", url: "/api/skills/arcana" },
    {
      index: "athletics",
      name: "Athletics",
      url: "/api/skills/athletics",
    },
    {
      index: "deception",
      name: "Deception",
      url: "/api/skills/deception",
    },
    { index: "history", name: "History", url: "/api/skills/history" },
    { index: "insight", name: "Insight", url: "/api/skills/insight" },
    {
      index: "intimidation",
      name: "Intimidation",
      url: "/api/skills/intimidation",
    },
    {
      index: "investigation",
      name: "Investigation",
      url: "/api/skills/investigation",
    },
    { index: "medicine", name: "Medicine", url: "/api/skills/medicine" },
    { index: "nature", name: "Nature", url: "/api/skills/nature" },
    {
      index: "perception",
      name: "Perception",
      url: "/api/skills/perception",
    },
    {
      index: "performance",
      name: "Performance",
      url: "/api/skills/performance",
    },
    {
      index: "persuasion",
      name: "Persuasion",
      url: "/api/skills/persuasion",
    },
    { index: "religion", name: "Religion", url: "/api/skills/religion" },
    {
      index: "sleight-of-hand",
      name: "Sleight of Hand",
      url: "/api/skills/sleight-of-hand",
    },
    { index: "stealth", name: "Stealth", url: "/api/skills/stealth" },
    { index: "survival", name: "Survival", url: "/api/skills/survival" },
  ],
};
export const abilityScoresResults = {
  results: [
    { index: "cha", name: "CHA", url: "/api/ability-scores/cha" },
    { index: "con", name: "CON", url: "/api/ability-scores/con" },
    { index: "dex", name: "DEX", url: "/api/ability-scores/dex" },
    { index: "int", name: "INT", url: "/api/ability-scores/int" },
    { index: "str", name: "STR", url: "/api/ability-scores/str" },
    { index: "wis", name: "WIS", url: "/api/ability-scores/wis" },
  ],
};
export const getSkills = () => {
  return Promise.resolve({
    data: {
      skillsResults,
      abilityScoresResults
    },
  });
};
