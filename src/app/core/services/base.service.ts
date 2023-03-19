import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  apiUrl = environment.apiUrl

  constructor(
    private http : HttpClient,

  
  ) { }

  get<T>(url:string): Observable<T>{
    return this.http.get<T>(this.apiUrl + url)
  }
}
