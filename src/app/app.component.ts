import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn = false;

  title: string;

  constructor(private tokenStorageService: TokenStorageService){
    this.title = 'Spring Boot - Angular Application';
  }

  ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
