import { getRequestBuilder } from "./main";

export const getClasses = () => {
    return getRequestBuilder("https://www.dnd5eapi.co/api/races");
}