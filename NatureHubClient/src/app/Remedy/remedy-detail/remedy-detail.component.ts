import { Component, OnInit } from '@angular/core';
import { Remedy } from '../../Models/remedies.model';
import { ActivatedRoute } from '@angular/router';
import { RemedyServiceService } from '../../services/remedy-service.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-remedy-detail',
  standalone: false,
  templateUrl: './remedy-detail.component.html',
  styleUrl: './remedy-detail.component.css',
})
export class RemedyDetailComponent implements OnInit {
  remedy: Remedy | null = null; // Instead of repeating the model
  private sanitizer: DomSanitizer;

  constructor(
    private route: ActivatedRoute,
    private remedyService: RemedyServiceService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Get ID from route
    if (id) {
      this.remedyService.getRemedyById(id).subscribe((data) => {
        if (data) {
          this.remedy = {
            ...data, // Spread existing properties
          };
        }
      });
    }
  }

  // ✅ Function to replace \n with <br>
  formatText(text: string): SafeHtml {
    // Ensure proper newline conversion
    if (!text) return '';
    return this.sanitizer.bypassSecurityTrustHtml(text.replace(/\\n/g, '<br>'));
  }
}
