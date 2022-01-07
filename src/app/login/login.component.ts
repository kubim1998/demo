import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, map } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  isLoginFailed = false;
  isLoggedIn = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router){
    
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    
    this.authService.login(username, password)
    .subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if(this.roles.includes('ROLE_ADMIN')){
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
       
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
