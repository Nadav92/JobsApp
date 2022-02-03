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
    introduction:       string;
    lookingFor:         string;
    skills:             string;
    lastJobs:           string;
    city:               string;
    country:            string;
    phoneNumber:        string;
    email:              string;
    photos:             Photo[];
    photoUrl:           string;
}