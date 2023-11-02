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
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FlexModule} from "@angular/flex-layout";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import { PaginatorComponent } from './shared/paginator/paginator/paginator.component';
import { PostComponent } from './features/home/post/post.component';
import {MatChipsModule} from "@angular/material/chips";
import {QuillModule} from "ngx-quill";
import { PostEditComponent } from './features/home/post/post-edit/post-edit.component';
import { TagDialogComponent } from './features/home/post/post-edit/tag-dialog/tag-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TopAppBarComponent,
    TextButtonComponent,
    HomeComponent,
    HasRoleDirective,
    PaginatorComponent,
    PaginatorComponent,
    PostComponent,
    PostEditComponent,
    TagDialogComponent
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
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexModule,
    MatPaginatorModule,
    MatChipsModule,
    FormsModule,
    QuillModule.forRoot(),
    MatDialogModule
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
    },
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorComponent
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
