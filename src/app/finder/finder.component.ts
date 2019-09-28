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
  user = {

  };
  constructor(private httpClient: HttpClient, private toaster: ToastrService) { }

  ngOnInit() {
  }
  getUser() {
    return this.httpClient.get(`https://api.github.com/users/${this.searchUser}?access_token=b39870d5dd43d528238ecb71187dcc0371823b9c`)
    .subscribe((res) => {
      this.user = res;
      console.log(this.user); // because asynchronous
    },
      err => {
        this.toaster.error('User not found');
      }
    );
  }

}
