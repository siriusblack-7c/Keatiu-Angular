import { Component } from '@angular/core';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import {MatFormField, MatFormFieldModule, MatHint} from '@angular/material/form-field';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatCalendar, MatDatepicker, MatDatepickerInput} from '@angular/material/datepicker';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import {CommonModule, NgForOf} from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TaskDialogComponent} from "./task-dialog/task-dialog.component";
import {RouterLink} from "@angular/router";
// import {TaskDialogComponent} from "./task-dialog/task-dialog.component";


interface Task {
  title: string;
  description: string;
  scheduledDate: Date;
}


@Component({
  selector: 'app-planner',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIconButton,
    MatIcon,
    MatHint,
    MatFormField,
    MatCard,
    MatInput,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatToolbar,
    MatSidenavContent,
    MatButton,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    NgForOf,
    MatDatepickerInput,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatCalendar,
    FormsModule,
    MatDivider,
    MatGridTile,
    MatGridList,
    MatFabButton,
    MatMenuTrigger,
    MatMenuItem,
    MatMenu,
    RouterLink
  ],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedDate = new Date();

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {
  }

  protected readonly Date = Date;

  today() {
    this.selectedDate = new Date();
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {date: this.selectedDate}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post<Task>('/influencers-api/api/planner-tasks', result).subscribe({
          next: (response) => {
            console.log('Task created successfully', response);
          },
          error: (error) => {
            console.error('Error creating task', error);
          }
        });
      }
    });
  }
}
