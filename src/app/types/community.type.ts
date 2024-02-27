import { User } from "./user.type";

export type Community = {
    id: string;
    name: string;
    members: User[];
};