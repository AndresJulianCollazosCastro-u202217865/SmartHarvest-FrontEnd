import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  insert(user: User): Observable<any> {
    return this.http.post(this.url + '/SmartHarvest/user', user)
  }
}
