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
  remedy: Remedy | null = null; // Use the model correctly

  constructor(
    private route: ActivatedRoute,
    private remedyService: RemedyServiceService,
    private sanitizer: DomSanitizer // ✅ Injecting DomSanitizer here
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

  formatText(text: string | null | undefined): SafeHtml {
    if (!text) {
      return '';
    }
    const formattedText = text.replace(/\\n/g, '<br>'); // Replace \n with <br>
    return this.sanitizer.bypassSecurityTrustHtml(formattedText); // Sanitize HTML
  }
}
