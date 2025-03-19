import { Component, OnInit } from '@angular/core';
import { RemedyServiceService } from '../../services/remedy-service.service';
import { Remedy } from '../../Models/remedies.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-remedy-list',
  standalone: false,
  templateUrl: './remedy-list.component.html',
  styleUrl: './remedy-list.component.css',
})
// export class RemedyListComponent implements OnInit {
//   remedies: Remedy[] = [];
//   filteredRemedies: Remedy[] = [];
//   selectedRemedy: Remedy | null = null;
//   categories: string[] = ['Immunity', 'Digestion', 'Skin Care', 'Detox']; // Add relevant categories
//   selectedCategory: string = '';

//   constructor(
//     private remedyService: RemedyServiceService,
//     private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit() {
//     this.remedyService.getRemedies().subscribe(
//       (data) => {
//         this.remedies = data;
//         this.filteredRemedies = data; // Display all remedies by default
//       },
//       (error) => {
//         console.error('Error fetching remedies', error);
//       }
//     );
//   }

//   formatText(text: string): SafeHtml {
//     // Ensure proper newline conversion
//     if (!text) return '';
//     return this.sanitizer.bypassSecurityTrustHtml(text.replace(/\\n/g, '<br>'));
//   }

//   getImagePath(remedyName: string): string {
//     return `/${remedyName.toLowerCase().replace(/\s+/g, '')}.jpg`;
//   }

//   filterRemedies() {
//     if (this.selectedCategory) {
//       this.filteredRemedies = this.remedies.filter(
//         (remedy) => remedy.Category === this.selectedCategory
//       );
//     } else {
//       this.filteredRemedies = [...this.remedies]; // Reset to all remedies
//     }
//   }

//   showDetails(id: number): void {
//     this.remedyService.getRemedyById(id).subscribe((data) => {
//       this.selectedRemedy = data;
//     });
//   }
// }
export class RemedyListComponent implements OnInit {
  remedies: Remedy[] = [];
  filteredRemedies: Remedy[] = [];
  selectedRemedy: Remedy | null = null;
  categories: string[] = ['Immunity', 'Digestion', 'Skin Care', 'Detox'];
  selectedCategory: string = '';

  constructor(
    private remedyService: RemedyServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.remedyService.getRemedies().subscribe(
      (data) => {
        this.remedies = data;
        this.filteredRemedies = data;
      },
      (error) => console.error('Error fetching remedies', error)
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filteredRemedies = this.remedies.filter(
      (remedy) => remedy.Category === category
    );
  }

  clearFilter() {
    this.selectedCategory = '';
    this.filteredRemedies = [...this.remedies];
  }

  getImagePath(remedyName: string): string {
    return `/assets/remedies/${remedyName
      .toLowerCase()
      .replace(/\s+/g, '')}.jpg`;
  }
}

