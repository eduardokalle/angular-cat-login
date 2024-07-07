import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topmenu',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './topmenu.component.html',
  styleUrl: './topmenu.component.scss',
})
export class TopmenuComponent {
  @Output() public sidenavToggle = new EventEmitter();
  constructor() {}
  onToggleSidenav() {
    console.log('toggle sidenav');
    this.sidenavToggle.emit();
  }
}
