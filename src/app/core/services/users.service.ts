import { Injectable } from '@angular/core';
import { IUsers } from '../interfaces/users';
import { BaseService } from './base.service';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {



  getAllUsers():Observable<IUsers[]>{
    return this.get<IUsers[]>('users')
  }
  
  currentUser(id: number):Observable<IUsers>{
    return this.get<IUsers>(`users/${id}`)
  }

  getAllFriends(userId: number): Observable<IUsers[]>{
    return this.get<IUsers[]>(`friends?_pages=1&userId=${userId}`)
  }

  addNewUser(data: IUsers): Observable<IUsers>{
    return this.post<IUsers>('users',data)
  }

  deleteUser(id: number): Observable<IUsers>{
    return this.delete<IUsers>(`users/${id}`)
  }

  }

  


