import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSnackBar} from "@angular/material/snack-bar";


interface Scene {
  uuid: string;
  title: string;
  script: string;
}

@Component({
  selector: 'app-editor-script',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    MatCheckbox,
    FormsModule,
    MatDivider,
    NgForOf,
    MatCardSubtitle,
    MatCard,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatButton,
    MatGridTile,
    MatGridList,
    NgIf,
    CdkTextareaAutosize,
    RouterLink,
    MatProgressSpinner,
    MatListItem,
    MatNavList,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel
  ],
  templateUrl: './editor-script.component.html',
  styleUrl: './editor-script.component.scss'
})
export class EditorScriptComponent implements OnInit {
  longVideoProjectUuid: string | null = null;
  loadingLongVideo: boolean = true;
  project: any = null;

  scenes: any = [
    {
      title: 'Introducción',
      text: 'Se da la bienvenida al espectador y se explica por qué la constancia es clave en redes sociales. Se da la bienvenida al espectador y se explica por qué la constancia es clave en redes sociales. Se da la bienvenida al espectador y se explica por qué la constancia es clave en redes sociales. Se da la bienvenida al espectador y se explica por qué la constancia es clave en redes sociales. Se da la bienvenida al espectador y se explica por qué la constancia es clave en redes sociales. ',
      editingTitle: false,
      editingText: false
    },
    {
      title: 'Errores comunes',
      text: 'Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. Se enumeran errores como compararse con otros, rendirse rápido o publicar sin plan. ',
      editingTitle: false,
      editingText: false
    },
    {
      title: 'Soluciones prácticas',
      text: 'Se ofrece una rutina simple con ejemplos reales para mantenerse constante sin quemarse. Se ofrece una rutina simple con ejemplos reales para mantenerse constante sin quemarse. Se ofrece una rutina simple con ejemplos reales para mantenerse constante sin quemarse. Se ofrece una rutina simple con ejemplos reales para mantenerse constante sin quemarse. Se ofrece una rutina simple con ejemplos reales para mantenerse constante sin quemarse. Se ofrece una rutina simple con ejemplos reales para mantenerse constante sin quemarse. Se ofrece una rutina simple con ejemplos reales para mantenerse constante sin quemarse. ',
      editingTitle: false,
      editingText: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
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
          if (response.status === 'script_ready') {
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
            script: any;
          }) => ({
            uuid: scene.uuid,
            title: scene.title || 'Sin título',
            script: scene.script || '',
          }));
          this.loadingLongVideo = false;
        },
        error: (error) => {
          console.error('Error loading scenes:', error);
          this.loadingLongVideo = false;
        }
      });
  }

  generatedDescription = 'Aprende cómo mantener la constancia en redes sociales con trucos prácticos y fáciles de aplicar.';
  generatedComment = '¿Tú también tienes dificultades para mantenerte constante? ¡Cuéntamelo en los comentarios! 👇';

  @ViewChildren('sceneTitleElement') sceneTitleElements!: QueryList<ElementRef>;


  // AGREGAR ESTO: Método para hacer scroll a una escena
  selectScene(index: number): void {
    // Asegurarse de que el elemento del título existe en el DOM
    const targetElement = this.sceneTitleElements.toArray()[index].nativeElement;
    if (targetElement) {
      targetElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  /**
   * Concatena todos los scripts de las escenas con saltos de línea.
   * @returns El texto concatenado de todos los scripts.
   */
  private _glueScenesScripts(): string {
    return this.scenes
      .map((scene: any) => scene.script || '')
      .filter((script: string) => script.trim() !== '')
      .join('\n\n'); // Dos saltos de línea para separar cada script
  }

  /**
   * Descarga todos los scripts concatenados como un archivo de texto.
   */
  downloadAllScripts(): void {
    const allScripts = this._glueScenesScripts();
    if (!allScripts) {
      this.snackBar.open('No hay scripts para descargar.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const blob = new Blob([allScripts], {type: 'text/plain'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.project.title || 'guion'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    this.snackBar.open('Guion descargado con éxito.', 'Cerrar', {
      duration: 3000,
    });
  }

  /**
   * Copia todos los scripts concatenados al portapapeles.
   */
  copyAllScriptsToClipboard(): void {
    const allScripts = this._glueScenesScripts();
    if (!allScripts) {
      this.snackBar.open('No hay scripts para copiar.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    navigator.clipboard.writeText(allScripts).then(() => {
      this.snackBar.open('Subtítulos copiados al portapapeles.', 'Cerrar', {
        duration: 3000,
      });
    }).catch(err => {
      console.error('Error al copiar al portapapeles:', err);
      this.snackBar.open('Error al copiar scripts. Inténtalo de nuevo.', 'Cerrar', {
        duration: 3000,
      });
    });
  }

  lastAttemptedUpdate: { [key: string]: number } = {};

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
      script: scene.script
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

  sendToTeleprompter(): void {
    localStorage.setItem('teleprompter_text', this._glueScenesScripts());
    this.router.navigate(['/influencers/studio/youtube/long/teleprompter']);
  }
}
