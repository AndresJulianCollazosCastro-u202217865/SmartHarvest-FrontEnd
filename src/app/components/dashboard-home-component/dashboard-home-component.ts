import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-home">
      <h2>Welcome to SmartHarvest Dashboard</h2>
      <p>This is your central hub for managing your agricultural activities.</p>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Active Crops</h3>
          <p class="stat-value">5</p>
        </div>
        <div class="stat-card">
          <h3>Weather Alerts</h3>
          <p class="stat-value">2</p>
        </div>
        <div class="stat-card">
          <h3>Recommendations</h3>
          <p class="stat-value">3</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-home {
      padding: 20px;
    }

    h2 {
      color: #2e7d32;
      margin-bottom: 20px;
    }

    .dashboard-stats {
      display: flex;
      gap: 20px;
      margin-top: 30px;
    }

    .stat-card {
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      flex: 1;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-card h3 {
      margin-top: 0;
      color: #555;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #2e7d32;
      margin: 10px 0 0;
    }
  `]
})
export class DashboardHomeComponent {
  // This component will display the dashboard home content
}
