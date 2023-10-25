import { getRequestBuilder } from "./main";

export const getMonsters = () => {
    return getRequestBuilder("https://www.dnd5eapi.co/api/monsters");
}

export const getMonsterStats = (monster: string) => {
    return getRequestBuilder(`https://www.dnd5eapi.co/api/monsters/${monster}`);
}