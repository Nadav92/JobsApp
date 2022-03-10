import { Profession } from './../enums/profession.enum';
import { EmployerOrEmployee } from "../enums/employerOrEmployee.enum";
import { User } from "./User";

export class UserParams {
    employerOrEmployee: EmployerOrEmployee;
    minAge = 18;
    maxAge = 150;
    pageNumber = 1;
    pageSize = 5;
    profession: Profession;
    orderBy = 'lastActive';

    constructor ({employerOrEmployee , profession} : User) {
        this.employerOrEmployee = employerOrEmployee === EmployerOrEmployee.Employee ? EmployerOrEmployee.Employer : EmployerOrEmployee.Employee;
        this.profession = profession = Profession.Default;
    }
}

