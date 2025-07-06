import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './recommendations-component.html',
  styleUrls: ['./recommendations-component.css']
})
export class RecommendationsComponent implements OnInit {
  listaCultivos: any[] = [];
  cultivoSeleccionado: any = null;
  recomendaciones: any[] = [];
  isLoading: boolean = false;
  dropdownOpen: boolean = false;
  mostrarModal: boolean = false;
  esAdmin: boolean = false;
  userId: number = 0;

  nuevaRecomendacion: any = {
    rTitle: '',
    rDescription: '',
    rCategory: '',
    user: { userId: 1 },
    crop: {}
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerCultivos();
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    this.userId = Number(localStorage.getItem('userId')) || 0;
    this.esAdmin = roles.includes('ROLE_ADMIN');
  }

  obtenerCultivos(): void {
    this.http.get<any>(`${environment.apiUrl}/SmartHarvest/cultivos`)
      .subscribe({
        next: data => {
          this.listaCultivos = data._embedded.cropDtoList;
        },
        error: err => console.error('Error al obtener cultivos', err)
      });
  }

  onCultivoSeleccionado(): void {
    if (this.cultivoSeleccionado) {
      this.isLoading = true;
      this.dropdownOpen = false;

      this.http.get<any>(`${environment.apiUrl}/SmartHarvest/recommendations/cultivo/${this.cultivoSeleccionado}`)
        .subscribe({
          next: data => {
            this.recomendaciones = data;
            this.isLoading = false;
          },
          error: err => {
            console.error('Error al obtener recomendaciones', err);
            this.isLoading = false;
          }
        });
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCultivo(cultivo: any): void {
    this.cultivoSeleccionado = cultivo.id;
    this.dropdownOpen = false;
    this.onCultivoSeleccionado();
  }

  getSelectedCultivoName(): string {
    if (this.cultivoSeleccionado) {
      const cultivo = this.listaCultivos.find(c => c.id === this.cultivoSeleccionado);
      return cultivo ? `${cultivo.cropName} - ${cultivo.cropType}` : 'Seleccione un tipo de cultivo';
    }
    return 'Seleccione un tipo de cultivo';
  }

  getIconClass(category: string): string {
    switch(category) {
      case 'IRRIGATION': return 'irrigation-icon';
      case 'FERTILIZATION': return 'fertilization-icon';
      case 'CROP_ROTATION': return 'rotation-icon';
      default: return 'irrigation-icon';
    }
  }

  getCategoryClass(category: string): string {
    switch(category) {
      case 'IRRIGATION': return 'irrigation-category';
      case 'FERTILIZATION': return 'fertilization-category';
      case 'CROP_ROTATION': return 'rotation-category';
      default: return 'irrigation-category';
    }
  }

  getIcon(category: string): string {
    switch (category) {
      case 'IRRIGATION': return 'assets/img/irrigation.png';
      case 'FERTILIZATION': return 'assets/img/fertilization.png';
      case 'CROP_ROTATION': return 'assets/img/rotation.png';
      default: return 'assets/img/default.png';
    }
  }

  abrirModal(): void {
    this.nuevaRecomendacion = {
      rTitle: '',
      rDescription: '',
      rCategory: '',
      userId: 1,
      cropId: null
    };
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardarRecomendacion(): void {
    if (!this.esAdmin) {
      alert('Solo los administradores pueden registrar recomendaciones.');
      return;
    }

    this.nuevaRecomendacion.cropId = this.cultivoSeleccionado;
    this.nuevaRecomendacion.userId = this.userId;

    console.log(this.nuevaRecomendacion);

    this.http.post<any>(`${environment.apiUrl}/SmartHarvest/recommendations`, this.nuevaRecomendacion)
      .subscribe({
        next: () => {
          this.cerrarModal();
          this.onCultivoSeleccionado(); // recargar recomendaciones
        },
        error: err => {
          console.error('Error al guardar recomendación', err);
        }
      });
  }

}
