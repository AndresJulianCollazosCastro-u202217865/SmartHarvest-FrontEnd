import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AlertReport} from '../model/alert-report';
import {WeatherAlert} from '../model/weater-alert';

@Injectable({
  providedIn: 'root'
})
export class WeatherAlertService {

  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getAlertReportByUser(userId: number): Observable<AlertReport[]> {
    return this.http.get<AlertReport[]>(`${this.url}/SmartHarvest/alertas/report?userId=${userId}`);
  }

  getAlerts(): Observable<WeatherAlert[]> {
    return this.http.get<any>(`${this.url}/SmartHarvest/alertas`).pipe(
      map(response => response._embedded.weatheralertDtoList)
    )
  }

}
