import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

interface Task {
  title: string;
  description: string;
  scheduledDate: Date;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatLabel,
    FormsModule,
    MatFormField,
    MatDialogContent,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDialogClose,
    MatDialogActions,
    MatInput,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
  task: Task = {
    title: '',
    description: '',
    scheduledDate: new Date()
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { date: Date },
  ) {
    if (data && data.date) {
      this.task.scheduledDate = data.date;
    }
  }
}
