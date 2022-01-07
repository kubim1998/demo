import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router){
    
  }
  canActivate(){
    if(!!this.tokenStorageService.getToken()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
