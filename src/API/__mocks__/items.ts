export const itemsResults = [
  {
    index: "amulet-of-health",
    name: "Amulet of Health",
    url: "/api/magic-items/amulet-of-health",
  },
  {
    index: "amulet-of-proof-against-detection-and-location",
    name: "Amulet of Proof against Detection and Location",
    url: "/api/magic-items/amulet-of-proof-against-detection-and-location",
  },
  {
    index: "amulet-of-the-planes",
    name: "Amulet of the Planes",
    url: "/api/magic-items/amulet-of-the-planes",
  },
];
export const itemStatsResults = {
  index: "amulet-of-health",
  name: "Amulet of Health",
  equipment_category: {
    index: "wondrous-items",
    name: "Wondrous Items",
    url: "/api/equipment-categories/wondrous-items",
  },
  rarity: {
    name: "Rare",
  },
  variants: [],
  variant: false,
  desc: [
    "Wondrous item, rare (requires attunement)",
    "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher",
  ],
  url: "/api/magic-items/amulet-of-health",
};
export const getItems = () => {
  return Promise.resolve({
    data: {
      itemsResults,
      itemStatsResults,
    },
  });
};
