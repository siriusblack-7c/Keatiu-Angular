import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatCard, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatInput} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTooltip} from "@angular/material/tooltip";

interface Scene {
  uuid: string;
  title: string;
  text: string;
  firstSentence?: string;
  lastSentence?: string;
}

@Component({
  selector: 'app-editor-scenes',
  standalone: true,
  imports: [
    NgForOf,
    MatListItem,
    MatNavList,
    MatCard,
    MatIcon,
    MatIconButton,
    MatLabel,
    FormsModule,
    MatFormField,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatInput,
    MatDivider,
    MatCardSubtitle,
    MatButton,
    RouterLink,
    MatProgressSpinner,
    NgIf,
    MatTooltip
  ],
  templateUrl: './editor-scenes.component.html',
  styleUrl: './editor-scenes.component.scss'
})
export class EditorScenesComponent implements OnInit {
  videoTitle = 'Cómo ser constante en redes sociales';
  longVideoProjectUuid: string | null = null;
  loadingLongVideo = true;
  project: any = null;

  scenes: Scene[] = [];

  lastAttemptedUpdate: { [key: string]: number } = {};

  selectedIndex = 0;

  loadingScriptGeneration = false;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.longVideoProjectUuid = this.route.snapshot.paramMap.get('long_video_project_uuid');
    console.log('Long Video Project UUID:', this.longVideoProjectUuid);
    if (this.longVideoProjectUuid) {
      this.waitForLongVideoProject();
    } else {
      this.router.navigate(['/influencers/studio/youtube/long']);
    }
  }

  waitForLongVideoProject(): void {
    const checkStatus = () => {
      this.http.get<{ status: string }>(`/influencers-api/api/long-video-projects/${this.longVideoProjectUuid}`)
        .subscribe(response => {
          if (response.status !== 'draft') {
            clearInterval(interval);
            this.project = response;
            this.loadScenes();
          }
        });
    }

    const interval = setInterval(checkStatus, 5000);
    checkStatus(); // Initial check
  }

  loadScenes(): void {
    this.http.get<Scene[]>(`/influencers-api/api/long-video-projects/${this.longVideoProjectUuid}/scenes`)
      .subscribe({
        next: (data: any) => {
          this.scenes = data.map((scene: {
            uuid: string;
            title: any;
            description: any;
            first_sentence: any;
            last_sentence: any;
          }) => ({
            uuid: scene.uuid,
            title: scene.title || 'Sin título',
            text: scene.description || 'Sin descripción',
            firstSentence: scene.first_sentence || '',
            lastSentence: scene.last_sentence || ''
          }));
          this.loadingLongVideo = false;
        },
        error: (err) => {
          console.error('Error loading scenes:', err);
          alert('Error loading scenes. Please try again later.');
          this.loadingLongVideo = false;
        }
      });
  }

  onModelUpdate(scene: Scene): void {
    this.lastAttemptedUpdate[scene.uuid] = Date.now();

    setTimeout(() => {
      const lastUpdate = this.lastAttemptedUpdate[scene.uuid];
      if (Date.now() - lastUpdate >= 5000) {
        this.updateScene(scene);
      }
    }, 5000);
  }

  updateScene(scene: Scene): void {
    this.http.put(`/influencers-api/api/long-video-scenes-projects/${scene.uuid}`, {
      title: scene.title,
      description: scene.text,
      first_sentence: scene.firstSentence,
      last_sentence: scene.lastSentence
    }).subscribe({
      next: () => {
        console.log('Scene updated successfully');
      },
      error: (err) => {
        console.error('Error updating scene:', err);
        alert('Error updating scene. Please try again later.');
      }
    });
  }

  get selectedScene(): Scene {
    return this.scenes[this.selectedIndex];
  }

  selectScene(index: number): void {
    this.selectedIndex = index;
  }

  previousScene(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  nextScene(): void {
    if (this.selectedIndex < this.scenes.length - 1) {
      this.selectedIndex++;
    }
  }

  generateScript(): void {
    if (this.loadingScriptGeneration) {
      return;
    }
    this.loadingScriptGeneration = true;

    const pendingUpdates = Object.keys(this.lastAttemptedUpdate).filter(uuid => {
      return Date.now() - this.lastAttemptedUpdate[uuid] < 5000;
    });

    this.scenes.forEach(scene => {
      if (pendingUpdates.includes(scene.uuid)) {
        this.updateScene(scene);
      }
    });

    this.http.post(`/influencers-api/api/long-video-projects/${this.longVideoProjectUuid}/process-script`, {})
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/influencers/studio/youtube/long/script', this.longVideoProjectUuid]);
          console.log(this.longVideoProjectUuid);
          console.log('Loading script generation response.');
          // this.loadingScriptGeneration = false;
        },
        error: (err) => {
          console.error('Error generating script:', err);
          alert('Error generating script. Please try again later.');
        }
      });
  }
}
