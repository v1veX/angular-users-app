import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-create-user',
  imports: [RouterLink, UserFormComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  user: User = {
    id: 20,
    name: 'sds',
    username: 'sdsd',
    email: 'sdsd',
    address: {
      city: 'sds',
      street: 'dsfsdf',
      suite: 'dsfsf',
      zipcode: 'sdsd'
    },
    phone: 'dsfsf',
    website: 'dsfsdf',
    company: {
      name: 'dsfsf'
    }
  }
}
