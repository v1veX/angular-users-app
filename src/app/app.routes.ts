import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersListComponent,
        title: 'Users',
    },
    {
        path: 'user/:id',
        component: UserDetailsComponent,
        title: 'User details',
    },
    {
        path: 'create-user',
        component: CreateUserComponent,
        title: 'Create user',
    },
    {
        path: 'edit-user/:id',
        component: EditUserComponent,
        title: 'Edit user',
    },
];
