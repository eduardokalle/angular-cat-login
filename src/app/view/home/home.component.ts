import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GlobalVariable } from '../../config/global';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { TopmenuComponent } from '../topmenu/topmenu.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidenavComponent,
    MatSidenavModule,
    TopmenuComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  AppName = GlobalVariable.APP_NAME;
  currentScreenWidth;
  sidenavWidth = 14;
  isLoading = false;
  errorMessage = '';
  constructor() {
    this.currentScreenWidth = window.innerWidth;
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.currentScreenWidth = window.innerWidth;
  }
}
