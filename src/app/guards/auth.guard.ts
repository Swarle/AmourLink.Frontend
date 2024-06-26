import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {map} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivateService} from "../services/activate.service";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);
  const activateService = inject(ActivateService);

  if(route.url.length < 1)
    return accountService.currentUser$.pipe(
      map(user => {
        if(user){
          router.navigateByUrl('/core')
          return false;
        }
        else{
          return true;
        }
      })
    );
  else
    return accountService.currentUser$.pipe(
      map(user => {
        if(user){
          if(!user.enabled){
            activateService.openActivateModal();
          }
          return true
        }
        else{
          toastrService.error('Щоб отримати доступ до цієї сторінки потрібно увійти в обліковий запис');
          router.navigateByUrl('');
          return false;
        }
      })
    );
};
