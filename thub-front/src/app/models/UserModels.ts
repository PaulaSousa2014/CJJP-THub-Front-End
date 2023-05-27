export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    nameSurn: string;
    profile_img: string;
    steam_username: string;
    job: Job;
    office: Office;
    roles: Roles;

}

export interface Job{
    id: number;

}

export interface Office{
    id: number;

}

export interface Roles{
    id: number;
}