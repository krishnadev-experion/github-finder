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
  isLoad = false;
  clicked = false;
  hasUser = true;
  user = {

  };
  constructor(private httpClient: HttpClient, private toaster: ToastrService) { }

  ngOnInit() {
  }
  getUser() {
    this.isLoad = true;
    return this.httpClient.get(`https://api.github.com/users/${this.searchUser}?access_token=b39870d5dd43d528238ecb71187dcc0371823b9c`)
    .subscribe((res) => {
      this.user = res;
      this.clicked = true;
      this.isLoad = false;
      this.hasUser = true;
      console.log(this.user);
    },
      err => {
        this.toaster.error('User not found!');
        this.hasUser = false;
        this.isLoad = false;
        this.clicked = true;
      }
    );
  }

}
