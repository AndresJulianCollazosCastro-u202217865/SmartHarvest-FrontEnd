import { Routes } from '@angular/router';
import {Dashboard} from './SmartHarvest/dashboard/dashboard';
import {Cultivos} from './SmartHarvest/cultivos/cultivos';
import {Alertas} from './SmartHarvest/alertas/alertas';
import {Recommendations} from './SmartHarvest/recommendations/recommendations';
import {LearningResources} from './SmartHarvest/learning-resources/learning-resources';


export const routes: Routes = [
  { path: 'SmartHarvest/dashboard', component: Dashboard },
  { path: 'SmartHarvest/cultivos', component: Cultivos},
  { path: 'SmartHarvest/alertas', component: Alertas },
  { path: 'SmartHarvest/recommendations', component: Recommendations },
  { path: 'SmartHarvest/learning-resources', component: LearningResources },
  { path: '**', redirectTo: 'SmartHarvest/dashboard' }
];
