import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { ProfileUserComponent } from "./view/profile-user/profile-user.component";
import { ListCatComponent } from "./view/list-cat/list-cat.component";
import { TableListCatsComponent } from "./view/table-list-cats/table-list-cats.component";

import isLogged from './guards/auth.guard';

import { getData } from './config/secureLS/secureLs';
const token = parseInt(getData('token'));

let pathRol = 'profile-user';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: pathRol , pathMatch: 'full', },
  { path: '', component: HomeComponent, canActivate: [isLogged],
    children: [
      //user
      {
        path: "profile-user",
        component: ProfileUserComponent,
      },
      {
        path: "list-cat",
        component: ListCatComponent,
      },
      {
        path: "table-list-cat",
        component: TableListCatsComponent,
      },
    ]  
  },
];
