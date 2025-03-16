import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ErrorComponent } from './pages/error/error.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'user/:idUser', component: UserDetailsComponent },
  { path: 'newUser', component: UserFormComponent },
  { path: 'updateUser/:idUser', component: UserFormComponent },
  { path: '**', component: ErrorComponent },
];
