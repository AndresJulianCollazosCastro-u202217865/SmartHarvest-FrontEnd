import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Recomendaciones} from '../model/recommendations';

const base_url = environment.apiUrl
@Injectable({
  providedIn: 'root'
})

export class RecomendacionesService {
  private url = `${base_url}/SmartHarvest/recommendations`;
  private http: HttpClient = inject(HttpClient);
  constructor() { }
  private listaCambio= new Subject<Recomendaciones[]>

  list(): Observable<Recomendaciones[]> {
    return this.http.get<Recomendaciones[]>(this.url);
  }

  insert(recommendation:Recomendaciones){
    console.log(recommendation);
    return this.http.post(this.url, recommendation)
  }

  setList(listaNueva: Recomendaciones[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }

  getListaCambio(): Observable<Recomendaciones[]>{
    return this.listaCambio.asObservable();
  }

  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
