import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {WeatherAlert, WeatherAlertType} from '../../model/weater-alert';
import {WeatherAlertService} from '../../services/weather-alert-service';

@Component({
  selector: 'app-alertas-component',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
  ],
  templateUrl: './alertas-component.html',
  styleUrl: './alertas-component.css'
})
export class AlertasComponent {
  alertas: WeatherAlert[] = [];
  selectedTipo: WeatherAlertType | '' = '';

  weatherAlertService = inject(WeatherAlertService);

  ngOnInit(): void {
    this.weatherAlertService.getAlerts().subscribe((data) => {
      console.log(data);
      this.alertas = data;
    });
  }

  onTipoChange(tipo: WeatherAlertType | ''): void {
    this.selectedTipo = tipo;
  }

}
