import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, Observable} from 'rxjs';
import {DashboardHateoas} from '../model/dashboard-hateoas';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  getDashboardLinks(): Observable<any> {
    return this.http.get<DashboardHateoas>(this.url + '/SmartHarvest/dashboard')
  }
}
