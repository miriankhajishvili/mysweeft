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

  getAllFriends(): Observable<IUsers[]>{
    return this.get<IUsers[]>('users-info')
  }

  }

  


