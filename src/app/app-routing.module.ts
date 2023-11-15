import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./features/register/register.component";
import {LoginComponent} from "./features/login/login.component";
import {HomeComponent} from "./features/home/home.component";
import {AuthService} from "./core/auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {PageNotFoundComponent} from "./features/page-not-found/page-not-found.component";
import {GardenInfoComponent} from "./features/garden-info/garden-info.component";
import {DocumentsComponent} from "./features/documents/documents.component";
import {ListOfGardenPlotComponent} from "./features/list-of-garden-plot/list-of-garden-plot.component";
import {CountersComponent} from "./features/counters/counters.component";
import {ListOfUsersComponent} from "./features/list-of-users/list-of-users.component";
import {UserInfoComponent} from "./features/user-info/user-info.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'garden-info', component: GardenInfoComponent },
  { path: 'documents', component: DocumentsComponent},
  { path: 'list-of-garden-plot', component: ListOfGardenPlotComponent},
  { path: 'list-of-users', component: ListOfUsersComponent},
  { path: 'counters', component: CountersComponent},
  { path: 'user-info/:id', component: UserInfoComponent},
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
  // { path: 'admin', component: AdminComponent, canActivate: [authGuard([Role.ADMIN] TODO: gdy będą role trzeba to pododawać
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, HttpClient]
})
export class AppRoutingModule { }
