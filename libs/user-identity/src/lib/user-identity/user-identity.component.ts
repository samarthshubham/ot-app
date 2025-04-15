import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-user-identity',
  imports: [CommonModule],
  templateUrl: './user-identity.component.html',
  styleUrl: './user-identity.component.css',
})
export class UserIdentityComponent implements OnInit {
  @Input() userName = 'Guest';
  timeOfDay = '';

  ngOnInit(): void {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.timeOfDay = 'morning';
    } else if (currentHour < 18) {
      this.timeOfDay = 'afternoon';
    } else {
      this.timeOfDay = 'evening';
    }
  }
}
