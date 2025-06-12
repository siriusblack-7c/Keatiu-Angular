import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-plans',
  standalone: true,
    imports: [
        MatButton,
        MatDivider,
        MatIcon,
        MatListItem,
        MatNavList,
        MatSidenav,
        MatCard,
        MatSidenavContainer,
        MatSidenavContent,
        MatToolbar,
        MatTooltip,
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {

}
