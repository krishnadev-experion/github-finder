import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {
  searchUser = '';
  isLoad = false; // For loading-spinner (loader)
  clicked = false; // To determine clicked or not
  hasUser = true; // Whether exact user profile got or not
  user = {

  };
  constructor(private httpClient: HttpClient, private toaster: ToastrService) { }

  ngOnInit() {
  }
  getUser() {
    this.isLoad = true;
    if (localStorage.getItem(this.searchUser)) { // Searching local storage
      this.user = JSON.parse( localStorage.getItem(this.searchUser));
      this.clicked = true;
      this.isLoad = false;
      this.hasUser = true;
      this.toaster.success('User found!', null, {
        timeOut: 3000,
        closeButton: true
      } );
    } else { // If local copy not found
      return this.httpClient.get(`https://api.github.com/users/${this.searchUser}?access_token=b39870d5dd43d528238ecb71187dcc0371823b9c`)
      .subscribe((res) => {
      this.user = res;
      this.clicked = true;
      this.isLoad = false;
      this.hasUser = true;
      this.toaster.success('User found!', null, {
        timeOut: 3000,
        closeButton: true
      } ); // User found toaster
      localStorage.setItem(this.searchUser, JSON.stringify(this.user));
    },
      err => {
        this.toaster.error('User not found!', null, {
          timeOut: 3000,
          closeButton: true
        } ); // User not found toaster
        this.hasUser = false;
        this.isLoad = false;
        this.clicked = true;
      }
    );
    }
  }
}
