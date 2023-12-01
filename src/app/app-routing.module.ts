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
import {WorkersListComponent} from "./features/garden-info/workers-list/workers-list.component";
import {PaymentsComponent} from "./features/payments/payments.component";
import {GardenPlotInfoComponent} from "./features/garden-plot-info/garden-plot-info.component";
import {AccesDeniedComponent} from "./features/acces-denied/acces-denied.component";
import {VotingsComponent} from "./features/votings/votings.component";
import {GardenOffersComponent} from "./features/garden-offers/garden-offers.component";
import {CalendarComponent} from "./features/calendar/calendar.component";
import {ListOfGardeneirsComponent} from "./features/list-of-gardeneirs/list-of-gardeneirs.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'garden-offers', component: GardenOffersComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'garden-info', component: GardenInfoComponent },
  { path: 'documents', component: DocumentsComponent},
  { path: 'list-of-garden-plot', component: ListOfGardenPlotComponent},
  { path: 'list-of-gardeneirs', component: ListOfGardeneirsComponent},
  { path: 'list-of-users', component: ListOfUsersComponent},
  { path: 'counters', component: CountersComponent},
  { path: 'user-info/:id', component: UserInfoComponent},
  { path: 'workers-list', component: WorkersListComponent},
  { path: 'payments', component: PaymentsComponent},
  { path: 'my-garden-plot-info', component: GardenPlotInfoComponent},
  { path: 'voting', component: VotingsComponent},
  { path: '404', component: PageNotFoundComponent },
  { path: '403', component: AccesDeniedComponent },
  { path: '**', redirectTo: '/404' }
  // { path: 'admin', component: AdminComponent, canActivate: [authGuard([Role.ADMIN] TODO: gdy będą role trzeba to pododawać
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, HttpClient]
})
export class AppRoutingModule { }
