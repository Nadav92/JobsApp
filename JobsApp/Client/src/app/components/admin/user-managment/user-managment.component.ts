import { map } from 'rxjs';
import { catchError } from 'rxjs';
import { RolesMoadlComponent } from './../../../modals/roles-moadl/roles-moadl.component';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {
  users: Partial<User[]>;
  bsModalRef: BsModalRef;

  constructor(private adminService:AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUserWithRoles();
  }

  getUserWithRoles(){
    this.adminService.getUserWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openRolesModal(user : User){
    const config={
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RolesMoadlComponent, config);

    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) => {
      const roleToUpdate = {
        roles: [...values.filter(el => el.checked == true).map(el => el.name)]
      };
      if(roleToUpdate){
        this.adminService.updateUSerRoles(user.username, roleToUpdate.roles).subscribe(()=> {
          user.roles = [...roleToUpdate.roles]
        })
      }
    })
  }

  private getRolesArray(user:User){
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin' , value: 'Admin'},
      {name: 'Moderator' , value: 'Moderator'},
      {name: 'Member' , value: 'Member'},
    ];
    
    availableRoles.forEach(role => {
      let isMatch = false;
      for(const userRole of userRoles){
        if(role.name === userRole){
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      } 
      if(!isMatch){
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }

}
