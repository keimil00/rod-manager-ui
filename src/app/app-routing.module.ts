import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {ComplaintsComponent} from "./features/complaints/complaints.component";
import {ListOfGardeneirsComponent} from "./features/list-of-gardeneirs/list-of-gardeneirs.component";
import {Role} from "./features/register/user.model";
import {AuthGuard} from "./app.component";
import {ForgetPasswordComponent} from "./features/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./features/reset-password/reset-password.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'garden-offers', component: GardenOffersComponent},
  { path: 'calendar', component: CalendarComponent},
  { path: 'voting', component: VotingsComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER, Role.NON_TECHNICAL_EMPLOYEE, Role.GARDENER] }},
  { path: 'garden-info', component: GardenInfoComponent },
  { path: 'workers-list', component: WorkersListComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER, Role.NON_TECHNICAL_EMPLOYEE] } },
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER, Role.NON_TECHNICAL_EMPLOYEE] } },
  { path: 'complaints', component: ComplaintsComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER, Role.NON_TECHNICAL_EMPLOYEE, Role.GARDENER] }},
  { path: 'list-of-garden-plot', component: ListOfGardenPlotComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER, Role.NON_TECHNICAL_EMPLOYEE] } },
  { path: 'list-of-gardeneirs', component: ListOfGardeneirsComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER, Role.NON_TECHNICAL_EMPLOYEE] } },
  { path: 'list-of-users', component: ListOfUsersComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER] } },
  { path: 'user-info/:id', component: UserInfoComponent},
  { path: 'counters', component: CountersComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER, Role.TECHNICAL_EMPLOYEE] } },
  { path: 'my-garden-plot-info', component: GardenPlotInfoComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.GARDENER] }},
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard], data: { expectedRoles: [Role.ADMIN,Role.MANAGER] } },
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'password-reset/:token', component: ResetPasswordComponent},
  { path: '404', component: PageNotFoundComponent },
  { path: '403', component: AccesDeniedComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, HttpClient]
})
export class AppRoutingModule { }
