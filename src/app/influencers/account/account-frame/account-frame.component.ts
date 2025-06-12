import { Component } from '@angular/core';
import {MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-account-frame',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    RouterOutlet
  ],
  templateUrl: './account-frame.component.html',
  styleUrl: './account-frame.component.scss'
})
export class AccountFrameComponent {

}
