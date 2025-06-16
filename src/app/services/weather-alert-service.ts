import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlertReport} from '../model/alert-report';

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
}
