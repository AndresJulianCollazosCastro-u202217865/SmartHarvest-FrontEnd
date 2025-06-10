import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthRequest} from '../model/auth-request';
import {AuthResponse} from '../model/auth-response';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  login(credentials: AuthRequest): Observable<any> {
    return this.http.post<AuthResponse>(this.url + '/SmartHarvest/authenticate', credentials)
      .pipe(
        map(resp => {
          localStorage.setItem('token',resp.jwt);
          localStorage.setItem('roles',JSON.stringify(resp.roles));
          return resp;
        })
      )
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    const stored = localStorage.getItem('roles');
    return stored ? JSON.parse(stored) : [];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
