import { getRequestBuilder } from "./main";

export const getRaces = () => {
    return getRequestBuilder("https://www.dnd5eapi.co/api/races");
}