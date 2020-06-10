import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { NewUserComponent } from '../new-user/new-user.component';

import { AuthGuard } from '../auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users/:id',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/new',
    component: NewUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


