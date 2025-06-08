import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard-component/dashboard-component';
import {CultivosComponent} from './components/cultivos-component/cultivos-component';
import {AlertasComponent} from './components/alertas-component/alertas-component';
import {RecommendationsComponent} from './components/recommendations-component/recommendations-component';
import {LearningResourcesComponent} from './components/learning-resources-component/learning-resources-component';
import {SignUpComponent} from './components/sign-up-component/sign-up-component';
import {DashboardHomeComponent} from './components/dashboard-home-component/dashboard-home-component';


export const routes: Routes = [
  { path: '', component: SignUpComponent },

  {
    path: 'SmartHarvest',
    component: DashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: 'cultivos', component: CultivosComponent },
      { path: 'alertas', component: AlertasComponent },
      { path: 'recommendations', component: RecommendationsComponent },
      { path: 'learning-resources', component: LearningResourcesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'SmartHarvest' }
];
