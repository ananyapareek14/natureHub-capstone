import { Component, OnInit } from '@angular/core';
import { HealthTipServiceService } from '../../services/health-tip-service.service';
import { ActivatedRoute } from '@angular/router';
import { HealthTip } from '../../Models/heal-tip.model';

@Component({
  selector: 'app-health-tips-detail',
  standalone: false,
  templateUrl: './health-tips-detail.component.html',
  styleUrl: './health-tips-detail.component.css',
})
export class HealthTipsDetailComponent implements OnInit {
  healthTip: HealthTip | null = null;

  constructor(
    private route: ActivatedRoute,
    private healthTipService: HealthTipServiceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.healthTipService.getTipById(id).subscribe((tip) => {
        this.healthTip = tip;
      });
    }
  }
}
