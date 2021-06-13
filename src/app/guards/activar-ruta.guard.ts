import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivarRutaGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if(!this.authService.getAuthenticated()) {
      console.log('Debe logguearse');
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
  
}
