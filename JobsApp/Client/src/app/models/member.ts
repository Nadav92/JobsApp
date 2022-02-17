import { Photo } from "./photo";

export interface Member {
    id:                 number;
    username:           string;
    age:                number;
    knownAs:            string;
    created:            Date;
    lastActive:         Date;
    employerOrEmployee: string;
    gender:             string;
    skills:             string;
    city:               string;
    country:            string;
    phoneNumber:        string;
    email:              string;
    professionalHistory:string;
    education:          string;
    languages:          string;
    militaryService:    string;
    professionalSummary:string;
    hobbies:            string;
    introduction:       string;
    photos:             Photo[];
    photoUrl:           string;
    profession:         string;
}