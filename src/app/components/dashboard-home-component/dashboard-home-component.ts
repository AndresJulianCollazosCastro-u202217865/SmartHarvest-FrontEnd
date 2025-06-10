import {Component, inject} from '@angular/core';
import {WeatherAlertService} from '../../services/weather-alert-service';
import {AlertReport} from '../../model/alert-report';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [

    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
  ],
  templateUrl: './dashboard-home-component.html',
  styleUrl: './dashboard-home-component.css',
})
export class DashboardHomeComponent {

  alertReport: AlertReport[] = [];
  userId = 1
  weatherAlertService = inject(WeatherAlertService)

  ngOnInit() {
    this.weatherAlertService.getAlertReportByUser(this.userId).subscribe((data) => {
      this.alertReport = data
    })
  }

  getTotalAlerts(): number {
    return this.alertReport.reduce((sum, r) => sum + r.total, 0);
  }
}
