import { City } from "./city.type";

export type Community = {
    id: string;

    label: string;

    address: string;

    addressDetail: string;
    
    city: City;
};