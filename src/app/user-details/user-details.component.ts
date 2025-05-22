import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/interfaces/user';
import { AlertService } from '../shared/services/alert.service';
import { PhoneLinkPipe } from '../shared/pipes/PhoneLinkPipe';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink, PhoneLinkPipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  user: User | undefined;
  deletionInProgress = false;

  constructor() {
    const userId = Number(this.route.snapshot.params['id']);
    this.usersService.getUser(userId).subscribe({
      next: user => {
        this.user = user;
      },
      error: () => {
        this.alertService.showAlert({
          title: 'Something went wrong',
          message: 'An error has occurred on the server and app can`t load user details. Please try reload the page.'
        })
      }
    });
  }

  onDeleteClick() {
    const userId = this.user?.id;

    if (!userId) {
      return;
    }

    this.deletionInProgress = true;
    this.usersService.deleteUser(userId).subscribe({
      next: res => {
        if (res.ok) {
          console.log(`User with id ${userId} is deleted.\nServer response status: ${res.status}`);
          this.deletionInProgress = false;
          this.alertService.showAlert({
            title: 'User successfully deleted',
            message: 'Because of using jsonplaceholder as data API, POST, PUT and DELETE requests are not mutate server data. If you want to ensure that requests really work, please check devtools console.',
            buttonText: 'Back to users',
            link: '/',
          });
        }
      },
      error: () => {
        this.alertService.showAlert({
          title: 'Something went wrong',
          message: 'An error has occurred on the server and app can`t delete user. Please try again later.'
        })
      }
    });
  }
}
