import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {WeatherAlert, WeatherAlertEstate, WeatherAlertType} from '../../model/weater-alert';
import {WeatherAlertService} from '../../services/weather-alert-service';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-alertas-component',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatCard,
    MatButton,
    FormsModule,
  ],
  templateUrl: './alertas-component.html',
  styleUrl: './alertas-component.css'
})
export class AlertasComponent {
  alertas: WeatherAlert[] = [];
  selectedTipo: WeatherAlertType | '' = '';
  selectedEstado: WeatherAlertEstate
  private userId!: number

  weatherAlertService = inject(WeatherAlertService);

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    this.onTipoChange(this.selectedTipo);
  }

  onTipoChange(tipo: WeatherAlertType | ''): void {
    this.selectedTipo = tipo;
    const typeParam = this.selectedTipo || undefined;
    console.log('Filtrando alertas con:', {
      userId: this.userId,
      type: typeParam,
      status: this.selectedEstado || undefined
    });
    this.weatherAlertService
      .getAlertsFiltered(this.userId, typeParam, this.selectedEstado || undefined)
      .subscribe({
        next: alerts => this.alertas = alerts,
        error: err    => console.error('Error al filtrar alertas', err)
      });
  }

  marcarComoLeida(alerta: WeatherAlert) {
    this.weatherAlertService.updateAlertState(this.userId,alerta.id).subscribe({
      next: () => {
          alerta.estado = WeatherAlertEstate.LEIDA
      },
      error: err => console.error('Error marcando alerta como leída', err)
    });
  }

  trackById(_: number, alerta: WeatherAlert) {
    return alerta.id;
  }

  protected readonly WeatherAlertType = WeatherAlertType;
}
