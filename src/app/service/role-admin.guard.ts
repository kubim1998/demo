import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
  private roles: string[] = [];
  showAdminBoard = true;
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {

  }
  canActivate() {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    if (this.showAdminBoard) {
      return true;
    }
    this.router.navigate(['user']);
    return false;
  }

}
