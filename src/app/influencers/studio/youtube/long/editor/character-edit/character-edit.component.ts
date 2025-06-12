import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-character-edit',
  standalone: true,
  imports: [
    MatLabel,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './character-edit.component.html',
  styleUrl: './character-edit.component.scss'
})
export class CharacterEditComponent {

  character: any;

  constructor(
    private dialogRef: MatDialogRef<CharacterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { character: any }
  ) {
    this.character = data.character;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveChanges() {
    this.dialogRef.close(this.character);
  }
}
