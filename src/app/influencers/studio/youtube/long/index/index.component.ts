import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {MatCard, MatCardImage} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatTooltip} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatIcon,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    MatIconButton,
    SlicePipe,
    MatCardImage,
    NgForOf,
    MatCard,
    MatDivider,
    MatButton,
    MatTooltip,
    RouterLink,
    NgIf
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  videos: any[] = [];
  fetchingVideos = true;

  currentPage = 1;
  lastPage = 1;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snakBar: MatSnackBar // Assuming you have MatSnackBar imported for notifications
  ) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(page: number = 1): void {
    this.fetchingVideos = true;
    this.http
      .get<any>(`/influencers-api/api/long-video-projects?page=${page}`)
      .subscribe({
        next: (response) => {
          this.videos = response.data.map((video: any) => ({
            uuid: video.uuid,
            title: video.title || '[Sin título]',
            description: video.idea,
            status: video.status,
            thumbnail: video.thumbnail_url || '/assets/influencers/studio/youtube_long/default_video_thumbnail3.png',
          }));
          if (this.videos.length === 0 && page === 1) {
            this.router.navigate(['/influencers/studio/youtube/long']);
          }
          this.currentPage = response.current_page;
          this.lastPage = response.last_page;
          this.fetchingVideos = false;
        },
        error: (error) => {
          console.error('Error loading videos:', error);
          this.fetchingVideos = false;
        },
      });
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.loadVideos(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadVideos(this.currentPage - 1);
    }
  }

  navigateToVideo(video: any): void {

    if (video.status == 'script_ready') {
      this.router.navigate(['/influencers/studio/youtube/long/script', video.uuid], {
        queryParams: {
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail
        }
      });
      return;
    } else {
      this.router.navigate(['/influencers/studio/youtube/long/scenes', video.uuid], {
        queryParams: {
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail
        }
      });
    }
  }

  deleteVideo(video: any): void {
    this.http.delete(`/influencers-api/api/long-video-projects/${video.uuid}`)
      .subscribe({
        next: () => {
          this.videos = this.videos.filter(v => v.uuid !== video.uuid);
          // alert('Proyecto archivado correctamente.');
          this.snakBar.open('Proyecto archivado correctamente.', 'Cerrar', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: (error) => {
          console.error('Error deleting video:', error);
          alert('Error al archivar el proyecto. Por favor, inténtalo de nuevo más tarde.');
        }
      });
  }
}
