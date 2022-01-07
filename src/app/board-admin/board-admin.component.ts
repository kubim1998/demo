import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  content?: string;
  isLoggedIn = false;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

}
