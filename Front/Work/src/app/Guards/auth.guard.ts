import { Injectable, ɵConsole } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    const user = localStorage.getItem('userId');
    if (user) {
        this.auth.getUser(user).subscribe((res) => {
          return true;
        });
        return true;
      } else
        this.router.navigate(['']);
    }
  }
