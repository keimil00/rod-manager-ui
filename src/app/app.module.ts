import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TopAppBarComponent} from './core/top-app-bar/top-app-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {TextButtonComponent} from './shared/text-button/text-button.component';
import {HomeComponent} from './features/home/home.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {
    GoogleLoginProvider,
    GoogleSigninButtonModule,
    SocialAuthServiceConfig,
    SocialLoginModule
} from "@abacritt/angularx-social-login";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {HasRoleDirective} from './core/has-role/has-role.directive';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';
import {GardenInfoComponent} from './features/garden-info/garden-info.component';
import {PersonCardGardenComponent} from './features/garden-info/person-card-garden/person-card-garden.component';
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {DocumentsComponent} from './features/documents/documents.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {ListOfGardenPlotComponent} from './features/list-of-garden-plot/list-of-garden-plot.component';
import {MatTableModule} from "@angular/material/table";
import {
    GardenPlotDetailsComponent
} from './features/list-of-garden-plot/garden-plot-details/garden-plot-details.component';
import {
    GardenPlotDetailsPaymentHistoryComponent
} from './features/list-of-garden-plot/garden-plot-details/garden-plot-details-payment-history/garden-plot-details-payment-history.component';
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {
    GardenPlotAddLeaseholderComponent
} from './features/list-of-garden-plot/garden-plot-add-leaseholder/garden-plot-add-leaseholder.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
    GardenPlotListAddGardenComponent
} from './features/list-of-garden-plot/garden-plot-list-add-garden/garden-plot-list-add-garden.component';
import {
    GardenPlotEditGardenComponent
} from './features/list-of-garden-plot/garden-plot-details/garden-plot-edit-garden/garden-plot-edit-garden.component';
import {FlexModule} from "@angular/flex-layout";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {PaginatorComponent} from './shared/paginator/paginator/paginator.component';
import {PostComponent} from './features/home/post/post.component';
import {MatChipsModule} from "@angular/material/chips";
import {QuillModule} from "ngx-quill";
import {PostEditComponent} from './features/home/post/post-edit/post-edit.component';
import {TagDialogComponent} from './features/home/post/post-edit/tag-dialog/tag-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CountersComponent} from './features/counters/counters.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MeasurementDialogComponent} from './features/counters/measurement-dialog/measurement-dialog.component';
import {AddCounterDialogComponent} from './features/counters/add-counter-dialog/add-counter-dialog.component';
import {ListOfUsersComponent} from './features/list-of-users/list-of-users.component';
import {UserInfoComponent} from './features/user-info/user-info.component';
import {WorkersListComponent} from './features/garden-info/workers-list/workers-list.component';
import {EditWorkerComponent} from './features/garden-info/workers-list/editOrAdd-worker/edit-worker.component';
import {PaymentsComponent} from './features/payments/payments.component';
import {IndividualPaymentsComponent} from './features/payments/individual-payments/individual-payments.component';
import {
    AddIndividualPaymentComponent
} from './features/payments/individual-payments/add-individual-payment/add-individual-payment.component';
import {EditingLeaseFeeComponent} from './features/payments/editing-lease-fee/editing-lease-fee.component';
import {EditingUtilityFeeComponent} from './features/payments/editing-utility-fee/editing-utility-fee.component';
import {
    EditingAdditionalFeesComponent
} from './features/payments/editing-additional-fees/editing-additional-fees.component';
import {
    AddAdditionalFeesComponent
} from './features/payments/editing-additional-fees/add-additional-fees/add-additional-fees.component';
import {
    EditingSingleAdditionalFeeComponent
} from './features/payments/editing-additional-fees/editing-single-additional-fee/editing-single-additional-fee.component';
import {EditDateComponent} from './features/payments/edit-date/edit-date.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GardenPlotInfoComponent } from './features/garden-plot-info/garden-plot-info.component';
import { FooterAppComponent } from './core/footer-app/footer-app.component';
import { TechnicalIssueDialogComponent } from './core/footer-app/technical-issue-dialog/technical-issue-dialog.component';
import { AccesDeniedComponent } from './features/acces-denied/acces-denied.component';
import { FolderListComponent } from './features/documents/folder-list/folder-list.component';
import { VotingsComponent } from './features/votings/votings.component';
import { CurrentVotingsComponent } from './features/votings/current-votings/current-votings.component';
import { FinishedVotingsComponent } from './features/votings/finished-votings/finished-votings.component';
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        TopAppBarComponent,
        TextButtonComponent,
        HomeComponent,
        HasRoleDirective,
        PageNotFoundComponent,
        GardenInfoComponent,
        PersonCardGardenComponent,
        DocumentsComponent,
        ListOfGardenPlotComponent,
        GardenPlotDetailsComponent,
        GardenPlotDetailsPaymentHistoryComponent,
        GardenPlotAddLeaseholderComponent,
        GardenPlotListAddGardenComponent,
        GardenPlotEditGardenComponent,
        HasRoleDirective,
        PaginatorComponent,
        PaginatorComponent,
        PostComponent,
        PostEditComponent,
        TagDialogComponent,
        CountersComponent,
        MeasurementDialogComponent,
        AddCounterDialogComponent,
        ListOfUsersComponent,
        UserInfoComponent,
        WorkersListComponent,
        EditWorkerComponent,
        PaymentsComponent,
        IndividualPaymentsComponent,
        AddIndividualPaymentComponent,
        EditingLeaseFeeComponent,
        EditingUtilityFeeComponent,
        EditingAdditionalFeesComponent,
        AddAdditionalFeesComponent,
        EditingSingleAdditionalFeeComponent,
        EditDateComponent,
        GardenPlotInfoComponent,
        FooterAppComponent,
        TechnicalIssueDialogComponent,
        AccesDeniedComponent,
        FolderListComponent,
        VotingsComponent,
        CurrentVotingsComponent,
        FinishedVotingsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatIconModule,
    MatGridListModule,
    MatExpansionModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatCheckboxModule,

    GoogleSigninButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexModule,
    MatPaginatorModule,
    MatChipsModule,
    FormsModule,
    QuillModule.forRoot(),
    MatDialogModule, MatTabsModule,
    MatSnackBarModule, MatRadioModule
  ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: true,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('73743782996-985u8v5a33kj2jnb7e62k093k7gop8ri.apps.googleusercontent.com')
                    }
                ]
            } as SocialAuthServiceConfig,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: MatPaginatorIntl,
            useClass: PaginatorComponent
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
