import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { provideRouter, Route, RouterLink } from '@angular/router';
import { getData } from '../../config/secureLS/secureLs';
import { Subscription } from 'rxjs';

//config
import { saveData } from '../../config/secureLS/secureLs';

//service


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
 
  screenHeight;
  currentScreenWidth;
  token: any;
  
  constructor(
    private router: Router,
    ) {
    this.currentScreenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

 async ngOnInit() {

  
  }

  
  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }
}
