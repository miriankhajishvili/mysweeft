import { Injectable } from '@angular/core';
import { IUsers } from '../interfaces/users';
import { BaseService } from './base.service';
import { Observable, map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  getUsers(pageCount: number ): Observable<IUsers[]> {
    return this.get<IUsers[]>(`users?_page=${pageCount}`);
  }  

  getUserFriends(userId: number): Observable<IUsers[]> {
    return this.get<IUsers[]>(`users`).pipe(
      map(users => users.filter(user => user.friends.includes(userId)))
    );
  }


  currentUser(id: number): Observable<IUsers> {
    return this.get<IUsers>(`users/${id}`);
  }

  addNewUser(data: IUsers): Observable<IUsers> {
    return this.post<IUsers>('users', data);
  }

  deleteUser(id: number): Observable<IUsers> {
    return this.delete<IUsers>(`users/${id}`);
  }

  getUserById(userId: number): Observable<IUsers> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.get<IUsers>(url);
  }
  
}
