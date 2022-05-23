import { MemberEditComponent } from './../components/member-edit/member-edit.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmService } from '../services/confirm.service';


@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent>{

constructor(private confirmService: ConfirmService) { }

    canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
        if(component.editGeneral.dirty || component.editResume.dirty){
            return this.confirmService.confirm()
        }
        return true;
    }
}
