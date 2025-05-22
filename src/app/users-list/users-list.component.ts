import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { AlertService } from '../shared/services/alert.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private usersService = inject(UsersService);
  private alertService = inject(AlertService);
  users: User[] | undefined;

  constructor() {
    this.usersService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
      },
      error: () => {
        this.users = [];
        this.alertService.showAlert({
          title: 'Something went wrong',
          message: 'An error has occurred on the server and app can`t load users list. Please try reload the page.'
        });
      }
    })
  }
}
