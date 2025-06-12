import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {CharacterEditComponent} from "../../studio/youtube/long/editor/character-edit/character-edit.component";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

interface Character {
  uuid: string;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    NgForOf,
    NgIf,
    MatDivider,
    MatCard,
    MatIcon,
    RouterLink
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  loadingCharacters: boolean = true;

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadCharacters();
  }

  openEditDialog() {
    if (this.selectedCharacter) {
      this.dialog.open(CharacterEditComponent, {
        width: '500px',
        data: {character: this.selectedCharacter}
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

  logout() {
    if (confirm('¿Cerrar sesión?')) {
      window.location.href = '/influencers-api/logout';
    }
  }

  deleteAccount() {
    alert('Para solicitar la anonimización de tu cuenta o reclamar cualquier derecho ARCO, por favor contacta con nosotros a través de nuestro correo electrónico: info@kreatiu.cat')
  }
}
