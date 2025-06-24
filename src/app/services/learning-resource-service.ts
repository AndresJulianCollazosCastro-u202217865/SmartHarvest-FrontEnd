import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LearningResourceReport} from '../model/learning-resource-report';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LearningResourcesService {

  private http: HttpClient  = inject(HttpClient);
  private url = environment.apiUrl;

  getByCategoria(categoria: string): Observable<LearningResourceReport[]> {
    return this.http.get<LearningResourceReport[]>(`${this.url}/SmartHarvest/learning-resources/${categoria}`);
  }
}
