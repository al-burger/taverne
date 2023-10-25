import { getRequestBuilder } from "./main";

export const getItems = () => {
    return getRequestBuilder("https://www.dnd5eapi.co/api/magic-items");
}

export const getItemStats = (item: string) => {
    return getRequestBuilder(`https://www.dnd5eapi.co/api/magic-items/${item}`);
}