import { OnChanges, Component, inject } from '@angular/core';
import { Input, Optional } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../shared/services/users.service';
import { AlertService } from '../shared/services/alert.service';
import { User } from '../shared/interfaces/user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges {
  @Input() @Optional() user: User | undefined;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    suite: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
  })
  private usersService = inject(UsersService);
  private alertService = inject(AlertService);
  private submitState = {
    action: 'create',
    buttonText: 'Create'
  }
  isSubmissionInProgress = false;

  ngOnChanges() {
    if (this.user) {
      this.submitState.action = 'update';
      this.submitState.buttonText = 'Apply changes';
      this.insertUserData();
    }
  }

  insertUserData() {
    if (!this.user) {
      return;
    }
    this.nameField.setValue(this.user.name);
    this.usernameField.setValue(this.user.username);
    this.emailField.setValue(this.user.email);
    this.cityField.setValue(this.user.address.city);
    this.streetField.setValue(this.user.address.street);
    this.suiteField.setValue(this.user.address.suite);
    this.zipcodeField.setValue(this.user.address.zipcode);
    this.phoneField.setValue(this.user.phone);
    this.companyField.setValue(this.user.company.name);
    this.websiteField.setValue(this.user.website);
  }

  handleRequestError() {
    this.alertService.showAlert({
      title: 'Something went wrong',
      message: 'An error has occurred on the server and app can`t send user data. Please try again later.'
    });
  }

  onCreate() {
    const newUser: User = {
      name: this.nameField.value!,
      username: this.usernameField.value!,
      email: this.emailField.value!,
      address: {
        city: this.cityField.value!,
        street: this.streetField.value!,
        suite: this.suiteField.value!,
        zipcode: this.zipcodeField.value!
      },
      phone: this.phoneField.value!,
      company: {
        name: this.companyField.value!
      },
      website: this.websiteField.value!
    }
    
    this.isSubmissionInProgress = true;
    this.usersService.createUser(newUser).subscribe({
      next: res => {
        if (res.ok) {
          this.alertService.showAlert({
            title: 'User successfully created',
            message: 'Because of using jsonplaceholder as data API, POST, PUT and DELETE requests are not mutate server data. If you want to ensure that requests really work, please check devtools console.',
            buttonText: 'Back to users',
            link: '/',
          })
          console.log(`User is created. Server response status: ${res.status}`);
        }
      },
      error:  () => {this.handleRequestError()},
      complete: () => {this.isSubmissionInProgress = false;}
    });
  }

  onUpdate() {
    const updatedUser: User = {
      ...this.user,
      name: this.nameField.value!,
      username: this.usernameField.value!,
      email: this.emailField.value!,
      address: {
        city: this.cityField.value!,
        street: this.streetField.value!,
        suite: this.suiteField.value!,
        zipcode: this.zipcodeField.value!
      },
      phone: this.phoneField.value!,
      company: {
        name: this.companyField.value!
      },
      website: this.websiteField.value!
    }

    this.isSubmissionInProgress = true;
    this.usersService.updateUser(updatedUser.id!, updatedUser).subscribe({
      next: res => {
        if (res.ok) {
          this.alertService.showAlert({
            title: 'User successfully updated',
            message: 'Because of using jsonplaceholder as data API, POST, PUT and DELETE requests are not mutate server data. If you want to ensure that requests really work, please check devtools console.',
            buttonText: 'Back to user details',
            link: `/user/${updatedUser.id}`,
          })
          console.log(`User is updated. User id: ${res.body?.id} Server response status: ${res.status}`);
        }
      },
      error: () => {this.handleRequestError()},
      complete: () => {this.isSubmissionInProgress = false;}
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    switch (this.submitState.action) {
      case 'create':
        this.onCreate();
        break;
      case 'update':
        this.onUpdate();
        break;
      default:
        throw new Error('Invalid submit action!');
    }
  }

  get nameField() {
    return this.form.controls.name;
  }

  get usernameField() {
    return this.form.controls.username;
  }

  get cityField() {
    return this.form.controls.city;
  }

  get streetField() {
    return this.form.controls.street;
  }

  get suiteField() {
    return this.form.controls.suite;
  }

  get zipcodeField() {
    return this.form.controls.zipcode;
  }

  get emailField() {
    return this.form.controls.email;
  }

  get companyField() {
    return this.form.controls.company;
  }

  get phoneField() {
    return this.form.controls.phone;
  }

  get websiteField() {
    return this.form.controls.website;
  }

  get buttonText() {
    return this.submitState.buttonText;
  }
}
