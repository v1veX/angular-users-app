import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  user: User | undefined;
  deletionInProgress = false;

  constructor() {
    const userId = Number(this.route.snapshot.params['id']);
    this.usersService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }

  onDeleteClick() {
    const userId = this.user?.id;

    if (!userId) {
      return;
    }

    this.deletionInProgress = true;
    this.usersService.deleteUser(userId).subscribe(res => {
      if (res.ok) {
        console.log(`User with id ${userId} is deleted.\nServer response status: ${res.status}`);
        this.deletionInProgress = false;
      }
    });
  }
}
