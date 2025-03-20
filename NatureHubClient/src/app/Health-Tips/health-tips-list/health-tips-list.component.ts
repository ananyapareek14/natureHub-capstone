import { Component, OnInit } from '@angular/core';
import { HealthTip } from '../../Models/heal-tip.model';
import { HealthTipServiceService } from '../../services/health-tip-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-health-tips-list',
  standalone: false,
  templateUrl: './health-tips-list.component.html',
  styleUrl: './health-tips-list.component.css',
})
// export class HealthTipListComponent implements OnInit {
//   healthTips: HealthTip[] = [];
//   isLoading = true;
//   errorMessage: string | null = null;

//   constructor(
//     private healthTipService: HealthTipServiceService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadHealthTips();
//   }

//   loadHealthTips() {
//     this.healthTipService.getAllTips().subscribe({
//       next: (data) => {
//         this.healthTips = data;
//         this.isLoading = false;
//       },
//       error: () => {
//         this.errorMessage = 'Failed to load health tips.';
//         this.isLoading = false;
//       },
//     });
//   }

//   viewDetails(id: number) {
//     this.router.navigate(['/health-tips', id]);
//   }
// }
export class HealthTipListComponent implements OnInit {
  healthTips: HealthTip[] = [];
  filteredHealthTips: HealthTip[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private healthTipService: HealthTipServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHealthTips();
  }

  loadHealthTips() {
    this.healthTipService.getAllTips().subscribe({
      next: (data) => {
        this.healthTips = data;
        this.filteredHealthTips = data;
        this.categories = [...new Set(data.map((tip) => tip.Category))]; // Extract unique categories
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load health tips.';
        this.isLoading = false;
      },
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredHealthTips = this.healthTips.filter(
      (tip) => tip.Category === category
    );
  }

  resetFilter() {
    this.selectedCategory = null;
    this.filteredHealthTips = [...this.healthTips];
  }

  viewDetails(id: number) {
    this.router.navigate(['/health-tips', id]);
  }
}

