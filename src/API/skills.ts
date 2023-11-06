import { getRequestBuilder } from "./main";

export const getSkills = () => {
    return getRequestBuilder("https://www.dnd5eapi.co/api/skills");
}

export const getAbilityScores = () => {
    return getRequestBuilder("https://www.dnd5eapi.co/api/ability-scores");
}