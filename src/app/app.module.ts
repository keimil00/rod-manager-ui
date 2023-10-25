import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TopAppBarComponent } from './core/top-app-bar/top-app-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { TextButtonComponent } from './shared/text-button/text-button.component';
import { HomeComponent } from './features/home/home.component';
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
import { HasRoleDirective } from './core/has-role/has-role.directive';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { GardenInfoComponent } from './features/garden-info/garden-info.component';
import { PersonCardGardenComponent } from './features/garden-info/person-card-garden/person-card-garden.component';
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { DocumentsComponent } from './features/documents/documents.component';
import {MatExpansionModule} from "@angular/material/expansion";

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
    DocumentsComponent
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
    FormsModule
  ],
  providers: [
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
