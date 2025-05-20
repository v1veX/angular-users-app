import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-edit-user',
  imports: [RouterLink, UserFormComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  user: User | undefined;

  constructor() {
    const userId = Number(this.route.snapshot.params['id']);
    this.usersService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }
}
