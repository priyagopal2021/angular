import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookreviews } from '../models/bookreviews.model';

const baseUrl = 'http://localhost:8080/api/review';


@Injectable({
  providedIn: 'root'
})
export class BookreviewService {

  constructor(private http: HttpClient) { }

  find():Observable<any>{
    console.log("print service");
    return this.http.get<Bookreviews[]>(`${baseUrl}/all`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/remove`, id);
  }
}
