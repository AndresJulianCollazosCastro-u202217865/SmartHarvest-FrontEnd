import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-cultivo-info',
  templateUrl: './cultivos-component.html',
  styleUrls: ['./cultivos-component.css'],
  standalone: true,
  providers: [DatePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule
  ]
})
export class CultivoInfoComponent {
  opcionSeleccionada: string = '';

  cultivo = {
    cropName: '',
    cropType: '',
    cropUbication: '',
    cropArea: 0,
    startDate: '',
    endDate: '',
    nextCropId: null,
    user: {
      id: 1,
    }
  };

  insumo = {
    name: '',
    quantity: 0,
    unit: '',
    description: '',
    crop: {
      id: null
    }
  };

  listaInsumos: any[] = [];

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  seleccionar(opcion: string) {
    if (this.opcionSeleccionada === opcion) {
      this.opcionSeleccionada = '';
      return;
    }

    this.opcionSeleccionada = opcion;

    if (opcion === 'insumos' || opcion === 'verificar') {
      this.obtenerInsumos();
    }
  }

  registrarCultivo() {
    this.cultivo.startDate = this.datePipe.transform(this.cultivo.startDate, 'yyyy-MM-dd')!;
    this.cultivo.endDate = this.datePipe.transform(this.cultivo.endDate, 'yyyy-MM-dd')!;

    this.http.post<any>(`${environment.apiUrl}/SmartHarvest/cultivos`, this.cultivo)
      .subscribe({
        next: (data) => {
          alert('Cultivo registrado correctamente');
          this.insumo.crop.id = data.id;
        },
        error: err => {
          alert('Error al registrar cultivo');
          console.error(err);
        }
      });
  }

  registrarInsumo() {
    this.http.post(`${environment.apiUrl}/SmartHarvest/supplies`, this.insumo)
      .subscribe({
        next: () => {
          alert('Insumo registrado con éxito');
          this.insumo = { name: '', quantity: 0, unit: '', description: '', crop: { id: this.insumo.crop.id } };
          this.obtenerInsumos();
        },
        error: err => {
          alert('Error al registrar insumo');
          console.error(err);
        }
      });
  }

  obtenerInsumos() {
    this.http.get<any[]>(`${environment.apiUrl}/SmartHarvest/supplies`)
      .subscribe({
        next: data => this.listaInsumos = data,
        error: err => console.error('Error al obtener insumos', err)
      });
  }
}
