import { MemberEditComponent } from './../components/member-edit/member-edit.component';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent>{

constructor(

) { }
    canDeactivate(component: MemberEditComponent): boolean {
        if(component.editGeneral.dirty || component.editResume.dirty){
            return confirm("Are you sure you eant to continue? Any unsaved changes will be lost!!!")
        }
        return true;
    }
}
