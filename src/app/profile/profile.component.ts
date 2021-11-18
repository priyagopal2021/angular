import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  isShown: boolean = false ;
  listData : any;
 

  reviewData:any={};
 constructor(private token: TokenStorageService,
  private router : Router) { }

  ngOnInit(): void {
    this.listData = [];
 
    this.currentUser = this.token.getUser();
  }

  
  // toggleShow() {
  //   this.isShown = ! this.isShown;
   
  //    }
  // getData(data:NgForm){
  //   console.warn(data)
  //   this.reviewData=data;
  // }
addbook() {
  this.router.navigate(['/table']);
}
}
