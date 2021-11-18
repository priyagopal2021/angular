import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import { Bookreviews } from '../models/bookreviews.model';
import { BookreviewService } from '../_services/bookreview.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  userForm : FormGroup;
  listData : any;
  bookreviews: Bookreviews[];
  submitted = false;
  loading = false;
  isShown: boolean = false ;

  currentReview: Bookreviews = {
    id : '',
    bookname: '',
    authorname: '',
    review: '',
    userId:''
  };
  constructor
  
  (private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookreviewService : BookreviewService) {}

    ngOnInit()
  {
    this.listData = [];
    this.userForm = this.fb.group({
      bookname: ['', Validators.required],
      authorname: ['', Validators.required],
      review: ['', Validators.required],
    });
    this.loadAllReviews();

  }

  private loadAllReviews() {
    console.log('get');
 this.bookreviewService.find()
     .pipe(first())
     .subscribe(bookreviews => this.bookreviews = bookreviews)
     console.log(this.bookreviews);;
     
}


   get f() { return this.userForm.controls; }

   addreview() {
    this.submitted = true;

    this.loading = true;
    this.bookreviewService.create(this.userForm.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log('addition successful');
                // this.router.navigate(['/bookreview']);
                this.userForm.reset();
                this.loadAllReviews();
            },
        );
          }
   reset(){
    this.userForm.reset();
    this.isShown=false;
   }

   toggleShow() {
    this.isShown = ! this.isShown;
     }

   close() {
    this.router.navigate(['/profile']);
}


deleteReview(){
  console.log("delete");
  this.bookreviewService.delete(this.currentReview.id)
  .subscribe(
    response => {
      console.log(response)
      this.loadAllReviews();
    },
error =>{
  console.log(error);
  console.log("delete");
  this.loadAllReviews();
});
}
}
