import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  headers: HttpHeaders;
  api = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
  }

  reg(item) {
    const url =  this.api + 'auth/signup';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(url, item, {headers});
  }

  login(item) {
    const url = this.api + 'auth/login';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post(url, item, {headers});
  }

  getUser(id) {
    return this.http.get(this.api + `auth/users/${id}`, { headers: this.headers })
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['']);
        }
        return throwError(error);
      }));
  }

}
