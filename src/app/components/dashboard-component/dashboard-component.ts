import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {DashboardService} from '../../services/dashboard-service';
import {DashboardLink} from '../../model/dashboard-hateoas';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {

  protected readonly RouterLink = RouterLink;

  links: DashboardLink | null = null;

  dashboardService: DashboardService = inject(DashboardService);
  route : Router = inject(Router);

  ngOnInit() {
    this.dashboardService.getDashboardLinks().subscribe(data => {
      this.links = data._links;
    })
  }

  getRelativePath(href: string): string {
    const url = new URL(href);
    return url.pathname;
  }
}
