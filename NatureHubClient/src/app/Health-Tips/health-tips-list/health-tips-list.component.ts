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
export class HealthTipListComponent implements OnInit {
  // healthTips: HealthTip[] = [];
  // filteredTips: HealthTip[] = [];
  // selectedCategory: string | null = null;

  // constructor(
  //   private healthTipService: HealthTipServiceService,
  //   private route: ActivatedRoute,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   this.loadHealthTips();
  //   this.route.queryParams.subscribe((params) => {
  //     this.selectedCategory = params['category'] || null;
  //     this.filterTips();
  //   });
  // }

  // loadHealthTips() {
  //   this.healthTipService.getAllTips().subscribe((tips) => {
  //     this.healthTips = tips;
  //     this.filterTips();
  //   });
  // }

  // filterTips() {
  //   if (this.selectedCategory) {
  //     this.filteredTips = this.healthTips.filter(
  //       (tip) => tip.Category === this.selectedCategory
  //     );
  //   } else {
  //     this.filteredTips = this.healthTips;
  //   }
  // }

  // viewDetails(id: number) {
  //   this.router.navigate(['/health-tips', id]);
  // }

  healthTips: HealthTip[] = [];
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
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load health tips.';
        this.isLoading = false;
      },
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/health-tips', id]);
  }
}
