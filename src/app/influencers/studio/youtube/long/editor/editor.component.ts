import {Component, OnInit} from '@angular/core';
import {MatChip, MatChipListbox, MatChipOption, MatChipSet} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {CharacterEditComponent} from "./character-edit/character-edit.component";
import {FormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

interface Character {
  uuid: string;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatChip,
    MatIcon,
    MatLabel,
    MatFormField,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatIconButton,
    MatChipSet,
    MatChipListbox,
    MatChipOption,
    MatInput,
    MatButton,
    NgForOf,
    MatOption,
    MatSelect,
    NgIf,
    MatCardActions,
    RouterLink,
    FormsModule,
    MatProgressSpinner
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {

  readonly suggestions: string[] = [
    'Cómo ganar tus primeros 100 seguidores',
    'Errores comunes al empezar en YouTube',
    'Rutina semanal de un creador de contenido',
    'Herramientas gratis para editar vídeos'
  ];

  characters: Character[] = [];
  selectedCharacter: Character|null = null;
  loadingCharacters: boolean = true;

  idea: string = '';

  sendingData: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
      this.loadCharacters();
  }

  private loadCharacters() {
    this.loadingCharacters = true;
    this.httpClient.get('/influencers-api/api/characters').subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.characters = data.map((char: any) => ({
            uuid: char.uuid,
            name: char.name,
            description: char.description,
            image: char.image_base64
          }));

          this.selectedCharacter = this.characters[0] || null;

        } else {
          console.error('Unexpected data format:', data);
        }

        this.loadingCharacters = false;
      },
      error: (error) => {
        console.error('Error loading characters:', error);

        this.loadingCharacters = false;
      }
    });
  }

  openEditDialog() {
    if (this.selectedCharacter) {
      this.dialog.open(CharacterEditComponent, {
        width: '500px',
        data: { character: this.selectedCharacter }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.httpClient.put('/influencers-api/api/characters/' + result.uuid, {
            name: result.name,
            description: result.description
          }).subscribe({
            next: () => {
              this.loadCharacters();
            },
            error: (error) => {
              console.error('Error updating character:', error);
            }
          });
        }
      });
    }
  }

  createLongVideoProject() {
    if (!this.selectedCharacter) {
      console.error('No character selected');
      return;
    }

    this.sendingData = true;

    this.httpClient.post('/influencers-api/api/long-video-projects', {
      character_uuid: this.selectedCharacter.uuid,
      idea: this.idea
    }).subscribe({
      next: (response: any) => {
        console.log('Long video project created:', response);
        // Redirect to scenes editor
        const projectUuid = response.uuid;
        this.router.navigate(['/influencers/studio/youtube/long/scenes/', projectUuid]).then(r => {
          this.sendingData = false;
        });
      },
      error: (error) => {
        console.error('Error creating long video project:', error);

        alert('Error creating long video project. Please try again later.');

      }
    });
  }
}
