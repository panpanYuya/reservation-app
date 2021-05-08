import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRoute, state: RouterStateSnapshot) {
    if(this.authService.isAuthenticated()){
      return true;
    }
    this.router.navigate(['/auth/login'])
    return false;

  }

}
