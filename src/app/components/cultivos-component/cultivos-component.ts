import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-cultivo-info',
  templateUrl: './cultivos-component.html',
  styleUrls: ['./cultivos-component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class CultivoInfoComponent {
  opcionSeleccionada: string = '';

  cultivo = {
    cropName: '',
    cropType: '',
    cropUbication: '',
    cropArea: 0,
    startDate: '',      // formato: 'YYYY-MM-DD'
    endDate: '',        // puede ser vacío
    nextCropId: null,   // opcional
    user: null          // se asignará antes de enviar
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

  constructor(private http: HttpClient) {}

  seleccionar(opcion: string) {
    this.opcionSeleccionada = opcion;
    if (opcion === 'insumos') {
      this.obtenerInsumos();
    }
  }

  registrarCultivo() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert("Usuario no identificado");
      return;
    }

    const cultivoPayload = {
      ...this.cultivo,
      user: { id: userId }
    };

    this.http.post('http://localhost:8080/SmartHarvest/cultivos', cultivoPayload)
      .subscribe({
        next: () => alert('Cultivo registrado correctamente'),
        error: err => {
          alert('Error al registrar cultivo');
          console.error(err);
        }
      });
  }

  registrarInsumo() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert("Usuario no identificado");
      return;
    }

    const insumoPayload = {
      ...this.insumo,
      user: { id: userId }  // si tu backend lo espera
    };

    this.http.post('http://localhost:8080/SmartHarvest/insumos', insumoPayload)
      .subscribe({
        next: () => {
          alert('Insumo registrado con éxito');
          this.insumo = {
            name: '',
            quantity: 0,
            unit: '',
            description: '',
            crop: { id: null }
          };
          this.obtenerInsumos();
        },
        error: err => {
          alert('Error al registrar insumo');
          console.error(err);
        }
      });
  }

  obtenerInsumos() {
    this.http.get<any[]>('http://localhost:8080/SmartHarvest/insumos')
      .subscribe({
        next: data => this.listaInsumos = data,
        error: err => console.error('Error al obtener insumos', err)
      });
  }
}
