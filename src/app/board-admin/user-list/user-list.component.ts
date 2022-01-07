import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user/user.service';

declare var $ : any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userModel: User;
  isSuccessful = false;
  indexPagination: number = 1;
  totalPagination!: number;
  listUserNotPagination: User[] = [];
  searchUser: FormGroup;
  countusers!: number;

  constructor(private userService: UserService, private router: Router, fb: FormBuilder) { 
    this.userModel = new User();
    this.searchUser = fb.group({
      name: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.listUsers();
    this.userService.countUsers().subscribe( (data: number) => {
      this.countusers = data;
    })
    this.userService.findAll().subscribe((data: User[]) => {

      this.listUserNotPagination = data;
      if ((this.listUserNotPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listUserNotPagination.length / 2)) + 1;
      }
    });
  }
  openPopup(username: any)
  {
    $("#user-form-modal").modal("show");
    this.userService.findByUsername(username).subscribe(
      data => this.userModel = data
    )
  }

  onSubmit(){
    this.userService.update(this.userModel).subscribe(
      data => {
        this.userModel = data
        this.isSuccessful = true;
        this.reloadPage();
      }
    );
    
  }

  deleteUser(id: number){
    this.userService.delete(id).subscribe(
      data => {
        this.listUsers();
      }
    )
  }

  listUsers(){
    this.userService.getAllUser(0).subscribe((data: User[]) => {
      this.users = data;
    });
  }

  search(){
    this.userService.search(this.searchUser.value.name).subscribe((data: User[]) => {
      this.users = data;
    });
  }

  findPaginnation() {
    this.userService.getAllUser((this.indexPagination * 2) - 2).subscribe((data: User[]) => {
      this.users = data;
    })
  }

  indexPaginationChage(value: number) {
    this.indexPagination = value;
  }

  firtPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.userService.getAllUser((this.indexPagination * 2) - 2).subscribe((data: User[]) => {
      this.users = data;
    })
  }

  prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.userService.getAllUser((this.indexPagination * 2) - 2).subscribe((data: User[]) => {
        this.users = data;
      })
    }
  }

  lastPage() {
    this.indexPagination = this.listUserNotPagination.length / 2;
    this.userService.getAllUser((this.indexPagination * 2) - 2).subscribe((data: User[]) => {
      this.users = data;
    })
  }

  reloadPage(): void {
    window.location.reload();
  }
  

}
