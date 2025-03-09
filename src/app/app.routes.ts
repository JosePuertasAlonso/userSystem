import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'user/:idUser', component: UserDetailsComponent },
  { path: 'newUser', component: CreateUserComponent },
  { path: 'updateUser/:idUser', component: UpdateUserComponent },
  { path: '**', component: ErrorComponent },
];
