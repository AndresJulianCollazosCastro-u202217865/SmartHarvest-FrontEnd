import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AlertReport} from '../model/alert-report';
import {WeatherAlert, WeatherAlertEstate, WeatherAlertType} from '../model/weater-alert';

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

  getAlertsFiltered(
    userId: number,
    type?: WeatherAlertType,
    status?: WeatherAlertEstate
  ): Observable<WeatherAlert[]> {
    let params = new HttpParams().set('userId', userId.toString());
    if (type)   params = params.set('type', type);
    if (status) params = params.set('status', status);
    console.log('Params en servicio:', params.toString());
    return this.http.get<WeatherAlert[]>(
      `${this.url}/SmartHarvest/alertas/filter`,
      { params }
    );
  }

  updateAlertState(userId: number, alertId: number): Observable<number> {
    const url = `${this.url}/SmartHarvest/alertas/mark-as-read/${userId}/${alertId}`;
    return this.http.put<number>(url, null);
  }
}
