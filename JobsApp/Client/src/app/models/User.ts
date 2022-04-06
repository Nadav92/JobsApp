import { EmployerOrEmployee } from "../enums/employerOrEmployee.enum";
import { Profession } from "../enums/profession.enum";

export interface User{
    username:string;
    token:string;
    photoUrl:string;
    knownAs: string;
    employerOrEmployee: EmployerOrEmployee;
    profession: Profession;
    roles: string [];
}