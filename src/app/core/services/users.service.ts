import { Injectable } from '@angular/core';
import { IUsers } from '../interfaces/users';
import { BaseService } from './base.service';
import { Observable,} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {


  
  getUsers(pageCount: number ): Observable<IUsers[]> {
    return this.get<IUsers[]>(`users?_page=${pageCount}`);
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

  getAllUsers(): Observable<IUsers[]>{
    return this.get<IUsers[]>('users')
  }


  
updateFriendList(currentUsr: IUsers, updatedFriends: number[]): Observable<IUsers> {

    const url =`users/${currentUsr.id}`

    const updatedUser = { ...currentUsr, friends: updatedFriends }
    return this.put<IUsers>(url, updatedUser);
  }
  
}
