import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  user: any = null;
  overview: any = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private dashboardService: UserServiceService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.isLoading = true;

    this.dashboardService.getUserProfile().subscribe({
      next: (profile) => {
        this.user = profile;
        this.loadUserOverview();
      },
      error: () => {
        this.errorMessage = 'Failed to load user profile.';
        this.isLoading = false;
      }
    });
  }

  loadUserOverview() {
    this.dashboardService.getUserOverview().subscribe({
      next: (data) => {
        this.overview = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load user overview.';
        this.isLoading = false;
      }
    });
  }
}
