import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  isPlaying: boolean = true;

  // ngAfterViewInit() {
  //   // Ensure the video starts playing
  //   if (this.bgVideo?.nativeElement) {
  //     this.bgVideo.nativeElement.play().catch((error) => {
  //       console.error('Autoplay blocked:', error);
  //     });
  //   }
  // }

  ngAfterViewInit() {
    this.tryPlayVideo();
  }

  tryPlayVideo() {
    if (this.bgVideo?.nativeElement) {
      this.bgVideo.nativeElement.play().catch(() => {
        console.warn('Autoplay blocked. Waiting for user interaction.');
        this.isPlaying = false; // Show play button
      });
    }
  }

  togglePlay() {
    if (this.bgVideo?.nativeElement) {
      if (this.bgVideo.nativeElement.paused) {
        this.bgVideo.nativeElement.play();
        this.isPlaying = true;
      } else {
        this.bgVideo.nativeElement.pause();
        this.isPlaying = false;
      }
    }
  }
}
