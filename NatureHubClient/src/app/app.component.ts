import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'natureHubClient';

  constructor(
    private router: Router
  ) {}

  shouldHideNavFooter(): boolean {
    const hiddenRoutes = ['/register', '/login'];
    return hiddenRoutes.includes(this.router.url);
  }  
}
