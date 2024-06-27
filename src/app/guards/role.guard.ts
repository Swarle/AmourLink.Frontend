import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AccountService} from "../services/account.service";
import {ToastrService} from "ngx-toastr";

export const roleGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);

  console.log(route.url);


  return true;
};
