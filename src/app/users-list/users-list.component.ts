import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private usersService = inject(UsersService);
  users: User[] | undefined;

  constructor() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }
}
